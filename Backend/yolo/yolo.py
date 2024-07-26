import base64
import io

from ultralyticsplus import YOLO, render_result
from PIL import Image
import os


def classify(image_to_classify):
    # load model
    script_directory = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_directory, 'runs/detect/train6/weights/best.pt')
    model = YOLO(model_path)
    foundSickLeaves = False

    labels = ['Healthy','Sick']
    predictDic = {label: (0, 0) for label in labels}

    model.overrides['conf'] = 0.25  # NMS confidence threshold
    model.overrides['iou'] = 0.45  # NMS IoU threshold
    model.overrides['agnostic_nms'] = False  # NMS class-agnostic
    model.overrides['max_det'] = 1000  # maximum number of detections per image
    im = Image.fromarray(image_to_classify)
    yolo_results = model.predict(im)
    render = render_result(model=model, image=image_to_classify, result=yolo_results[0])
    #render.show()
    # Convert the image to RGB mode
    if render.mode == 'RGBA':
        render = render.convert('RGB')

    buffered = io.BytesIO()
    render.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    yolo_boxes = yolo_results[0].boxes.xyxy.tolist()
    if not yolo_boxes:
        return {'label': 'No identify', 'confidence': 100, 'image': img_str}

    yolo_class_indices = yolo_results[0].boxes.cls.tolist()
    yolo_confidences = yolo_results[0].boxes.conf.tolist()

    for box, class_index, confidence in zip(yolo_boxes, yolo_class_indices, yolo_confidences):
        x_min, y_min, x_max, y_max = box
        class_label = labels[int(class_index)]
        predictDic[class_label] = (predictDic[class_label][0] + 1, predictDic[class_label][1] + confidence)
        if class_label == 'Sick':
            foundSickLeaves = True
        print(
            f"Detected {class_label} with confidence {confidence:.2f} at coordinates: ({x_min}, {y_min}, {x_max}, {y_max})")

    if foundSickLeaves:
        max_label = 'Sick'
    else:
        max_label = 'Healthy'

    avg_confidence = predictDic[max_label][1] / predictDic[max_label][0] if predictDic[max_label][0] > 0 else 1
    return {'label': max_label, 'confidence': round(avg_confidence * 100, 2), 'image': img_str}

