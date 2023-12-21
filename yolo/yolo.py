from ultralyticsplus import YOLO, render_result
from PIL import Image
import os


def classify(image_to_classify):
    # load model
    script_directory = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(script_directory, 'runs/detect/train/weights/best2.pt')
    model = YOLO(model_path)

    predictDic = {"Potato_healthy": (0, 0),
                  "Potato_early_blight": (0, 0),
                  "Potato_late_blight": (0, 0),
                  "Tomato_healthy": (0, 0),
                  "Tomato_early_blight": (0, 0),
                  "Tomato_late_blight": (0, 0)}

    label = ["Potato_healthy",
             "Potato_early_blight",
             "Potato_late_blight",
             "Tomato_healthy",
             "Tomato_early_blight",
             "Tomato_late_blight"]

    model.overrides['conf'] = 0.25  # NMS confidence threshold
    model.overrides['iou'] = 0.45  # NMS IoU threshold
    model.overrides['agnostic_nms'] = False  # NMS class-agnostic
    model.overrides['max_det'] = 1000  # maximum number of detections per image
    im = Image.fromarray(image_to_classify)
    yolo_results = model.predict(im)
    render = render_result(model=model, image=image_to_classify, result=yolo_results[0])
    #render.show()

    yolo_boxes = yolo_results[0].boxes.xyxy.tolist()
    yolo_class_indices = yolo_results[0].boxes.cls.tolist()
    yolo_confidences = yolo_results[0].boxes.conf.tolist()

    for box, class_index, confidence in zip(yolo_boxes, yolo_class_indices, yolo_confidences):
        x_min, y_min, x_max, y_max = box
        class_label = label[int(class_index)]
        predictDic[class_label] = (predictDic[class_label][0] + 1, predictDic[class_label][1] + confidence)


        print(
            f"Detected {class_label} with confidence {confidence:.2f} at coordinates: ({x_min}, {y_min}, {x_max}, {y_max})")

    max_label = max(predictDic, key=lambda k: predictDic[k][0])
    avg_confidence = predictDic[max_label][1] / predictDic[max_label][0] if predictDic[max_label][0] > 0 else 1
    return max_label, avg_confidence
