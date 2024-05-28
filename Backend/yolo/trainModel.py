from ultralyticsplus import YOLO

# Load a model
model = YOLO("yolov8n.yaml")  # build a new model from scratch
model.overrides['conf'] = 0.25  # NMS confidence threshold
model.overrides['iou'] = 0.45  # NMS IoU threshold
model.overrides['agnostic_nms'] = False  # NMS class-agnostic
model.overrides['max_det'] = 1000  # maximum number of detections per image
model.overrides['flipud'] = 0.5
model.overrides['fliplr'] = 0.5

# Use the model
results = model.train(data="config.yaml", epochs=35)  # train the model

