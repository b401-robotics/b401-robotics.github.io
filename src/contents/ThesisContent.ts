export const thesisEN = {
  sectionLabel: "",
  heading: "Student",
  headingAccent: "Theses",
  body: "Undergraduate and postgraduate theses conducted at the B401 Robotics & Intelligent Systems Laboratory.",
  items: [
    {
      title:
        "Development of a Humanoid Robot Balance System Based on Load Cells",
      author: "Faris Rafi Pramana",
      year: 2024,
      abstract:
        "Balance and stability are key aspects in the development of humanoid robots, particularly when the robot performs activities involving leg movements while supported by only one foot. This research aims to develop a balance system for a humanoid robot using load cell sensors on the soles of its feet. The humanoid robot used in this research is the VI-ROSE ITS robot. The developed balance system monitors changes in the loads on both feet and calculates the robot's Center of Pressure (CoP). A load-cell-based balance system for the VI-ROSE ITS humanoid robot was successfully implemented using four load cells installed on the robot's feet. The sensor data are processed by an ESP32-C3 microcontroller and transmitted to the main microcontroller through the ESP-NOW protocol. The sensor measurement error ranges from 0 to 50 grams, with average errors of 14.8 grams on the right foot and 14.6 grams on the left foot. The sensors can detect the center of pressure along the X-axis, with a maximum value of 1.44 when the right foot is lifted and a minimum value of -1.33 when the left foot is lifted. The robot can maintain its balance using a PID controller that adjusts the roll position through five servos. With proportional gain Kp = 0.10 and derivative gain Kd = 0.005, the robot achieves a 100% success rate in maintaining balance while lifting one foot at an inclination of 3 degrees.",
    },
    {
      title:
        "Drowsiness Classification Based on Eye Openness (PERCLOS) and Mouth Aspect Ratio (MAR) Using the Karolinska Sleepiness Scale and Support Vector Machine",
      author: "Joel Napitupulu",
      year: 2024,
      abstract:
        "People need concentration to perform their work. Drowsiness often becomes a problem that disrupts a person's concentration while working and can lead to workplace accidents. This research aims to classify a person's level of drowsiness using PERCLOS (Percentage of Eye Closure) and MAR (Mouth Aspect Ratio) as indicators of drowsiness. The study uses the Karolinska Sleepiness Scale to assess subjective sleepiness and applies a Support Vector Machine (SVM) for automatic classification. Multilayer Perceptron (MLP) and Long Short-Term Memory (LSTM) models are also used for comparison. The research is conducted using a verified video dataset. Eye openness and MAR values are extracted from the video dataset, and the eye-openness values are then used to calculate PERCLOS. PERCLOS and MAR values are used to train the models. Data augmentation is performed before training to obtain the best model. When trained using data without augmentation, the SVM achieves 44% accuracy, the MLP achieves 44%, and the LSTM achieves 56%. When trained using augmented data, the models achieve accuracies of 92% for SVM, 81% for MLP, and 81% for LSTM.",
    },
    {
      title:
        "Electric Wheelchair Control System Using a Touchpad Based on Raspberry Pi",
      author: "Faruq Putra Rahardjo",
      year: 2024,
      abstract:
        "This research develops an electric wheelchair control system using a touchpad based on Raspberry Pi to improve users' independence and quality of life. The system is designed to read user inputs and translate them into commands to control the wheelchair. Testing shows that the system can execute forward, backward, right-turn, left-turn, clockwise-spin, counterclockwise-spin, and stop commands with a high success rate. In addition, the system demonstrates a fast response time, providing a positive and responsive user experience. The research consists of several main stages, beginning with an introduction that explains the background, problem formulation, objectives, and research limitations. A literature review is then conducted to examine existing work on wheelchair control technology and the use of touchpads and Raspberry Pi. The system design and implementation are described in detail, including the selection of hardware and software. Testing and analysis are conducted to evaluate system performance and demonstrate its reliability in various situations. The conclusion summarizes the findings and provides recommendations for future development, including testing under different environmental conditions, adding safety features, and developing companion applications for smartphones or tablets. This system enables users to control electric wheelchair movement more easily, improving their independence and quality of life. The research successfully addresses the stated problem and makes a practical contribution to assistive technology.",
    },
    {
      title:
        "Drowsiness Classification Based on the Karolinska Sleepiness Scale Using Eye Aspect Ratio and Multilayer Perceptron",
      author: "Andhika Putra",
      year: 2024,
      abstract:
        "Drowsiness classification faces challenges in everyday practical applications because intrusive methods such as electroencephalography (EEG), despite their accuracy, interfere with normal activities. A decrease in the frame rate (FPS) of video recordings can produce invalid data, while imbalanced datasets make it difficult for models to classify drowsiness levels. Many drowsiness-classification systems are unable to distinguish different levels of sleepiness in sufficient detail. Non-intrusive methods such as the Eye Aspect Ratio (EAR) also face accuracy and reliability issues due to individual variability. This research aims to develop a classifier that categorizes drowsiness based on eye-blink patterns into three classes: alert, low alertness, and drowsy. The classifier uses a Multilayer Perceptron (MLP) model trained on EAR data. The study also reconstructs missing data using interpolation and balances the data to improve model accuracy. The results show that MLP performs better than Long Short-Term Memory (LSTM) and Support Vector Machine (SVM) in classifying the three drowsiness categories. The MLP accuracies for low alertness, drowsy, and alert are 0.43, 0.42, and 1.00, respectively, with an overall accuracy of 0.48. LSTM achieves an overall accuracy of 0.38, while SVM achieves 0.43. The study highlights the effectiveness of spline interpolation compared with linear interpolation, with two of the three models achieving their best performance using cubic spline interpolation. It also emphasizes the importance of balancing the amount of data per video and per category to avoid bias in model performance.",
    },
    {
      title:
        "Human-Robot Interaction Using a Large Language Model for Action Plan Generation on a Robotic Arm",
      author: "Aryaduta Putra Perkasa",
      year: 2024,
      abstract:
        "The increasing interaction between humans and robots creates a need for more natural human-robot interaction. Recent advances in Large Language Models (LLMs) have improved computers' ability to understand the context of natural human language. However, applying LLMs to control robots in real time and in real-world environments remains challenging, as many implementations fail to integrate real-time environmental data or connect robot functions beyond high-level API instructions. This research explores the use of LLMs to generate low-level instructions by creating robotic action plans in JSON format, enabling access to all available robot functions. It also examines the use of cameras to collect environmental data and a website to facilitate user interaction, with the goal of making human-robot interaction more natural. The methodology involves fine-tuning a pretrained Gemma 2B model on a dataset of robot action pairs using supervised learning and Low-Rank Adaptation (LoRA) to generate action plans for a robotic arm. The results show that the fine-tuned model achieves an average exact-match rate of 86% on a validation dataset of 200 tasks and an average success rate of 82% in real-world use across 40 tasks. These findings suggest that fine-tuning can help LLMs understand natural-language commands and generate robotic action plans from those commands.",
    },
    {
      title:
        "Simulator Integration for a ROS-Based Multi-Robot System Using OpenManipulator-X and UR5 for Robotics Learning",
      author: "Muhammad Risyad Ibenzani",
      year: 2025,
      abstract:
        "This research discusses the development of a simulation-based learning tool for a multi-robot system that integrates the UR5 and OpenManipulator-X robots connected to a TurtleBot3 Waffle Pi. ROS Noetic is used as the middleware, and Gazebo serves as the simulator. The robots in the simulation can be controlled using BehaviorTree.CPP for communication with ROS and Groot as the graphical interface. The research results are evaluated with 10 volunteers divided into two groups: three volunteers experienced in operating ROS and seven volunteers without ROS experience. The volunteers are asked to operate the system using a learning module designed to evaluate the suitability of the research outcome for robotics education. The evaluation measures the time required to complete each scenario and the ease of operating the system after all scenarios have been completed. The module consists of three test scenarios that differ in the complexity of multi-robot collaboration activities. This research is intended to provide a learning tool for robotics and multi-robot systems.",
    },
    {
      title:
        "Implementation of Drowsiness Classification Using IndRNN on a Single-Board Computer",
      author: "Itqan Fikri Assagaf",
      year: 2025,
      abstract:
        "This research develops a drowsiness-detection system based on an Independently Recurrent Neural Network (IndRNN), implemented on a Jetson Nano Single-Board Computer (SBC), to warn drivers in real time when they are detected to be in a dangerous condition. The system uses a camera to record video, from which Eye Aspect Ratio (EAR) and Mouth Aspect Ratio (MAR) features are extracted using the MediaPipe library. These features are normalized and processed in a sliding-window format to match the model's training data, enabling continuous data processing. The method monitors driver drowsiness using two warning levels. At the first level, when a driver is detected to have low alertness, the system warns them to rest immediately. At the second level, when the driver's condition progresses to drowsiness, the system activates a continuous alarm to warn the driver to stop and take a full rest. The Jetson Nano runs the model efficiently, while an integrated buzzer provides audible warnings based on the detected drowsiness level. The implementation results show that the system meets its intended objectives. It can monitor driver drowsiness and provide early warnings according to the detected level. The hardware integration, including the camera, Jetson Nano, and buzzer, operates correctly and provides warnings corresponding to the detected level of drowsiness, thereby supporting driver safety. Based on the research findings, the most effective drowsiness-classification model is IndRNN using a sliding-window technique with the training data, achieving 99.1% training accuracy and 88.6% validation accuracy. Furthermore, deployment on the Jetson Nano demonstrates efficient performance, with an inference speed of 11–13 FPS, making it suitable for real-time drowsiness classification.",
    },
    {
      title:
        "Object Detection, Warning System, and Navigation on a Computer-Based Nano Drone Quadcopter",
      author: "Muhammad Faris Rahmansyah",
      year: 2025,
      abstract:
        "Technology has developed rapidly and has become increasingly sophisticated. As modern technology advances, technologies such as quadcopter drones, cameras, and microcontrollers are becoming more integrated into a wide range of applications. This project explores an implementation in which a small drone, the Crazyflie 2.1, operates indoors, captures images using its expansion module, known as the AI-deck 1.1, and provides audible alarms through a device or circuit integrated with an ESP32 microcontroller. The drone system is centered on a computer or laptop, where most of the processing for each function is performed to provide more advanced system capabilities. This makes the drone system computer-based, or off-board. Its functions include implementing drone control using a PID controller, object detection using the YOLOv5 convolutional neural network (CNN) model, image processing using the OpenCV library, and an alarm or warning system implemented through an ESP32 using Internet of Things (IoT) methods.",
    },
    {
      title:
        "Autonomous Grasping on a Quadruped Robot with Task-Level Interaction",
      author: "Mochammad Hilmi Rusydiansyah",
      year: 2025,
      abstract:
        "Quadruped robots are increasingly used in various applications because of their high mobility and ability to operate across diverse terrains. However, most currently available quadruped robots focus primarily on mobility and lack the ability to manipulate objects. Equipping a quadruped robot with a robotic arm and gripper makes manual control challenging, particularly in remote scenarios that require complex commands. This research aims to develop an autonomous grasping system for a quadruped robot using a task-level interaction approach. The developed system includes hardware integration of a robotic arm and gripper onto the quadruped robot, a hierarchical control system designed using ROS, and a web interface for human-robot interaction. The robot can autonomously perform tasks ranging from navigation and object detection to grasping using GraspNet. Testing is conducted in real-world scenarios to evaluate navigation, object selection and grasping, and user experience. The results show that the robot can perform tasks accurately and consistently, achieving a grasping success rate of 76.6% across 30 trials. The web interface also receives positive feedback from users. Therefore, the system demonstrates considerable potential to enhance the capabilities of quadruped robots as service robots in real-world environments.",
    },
  ],
} as const;
