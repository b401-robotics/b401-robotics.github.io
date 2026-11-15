// Every `image` field below (on both rooms and facilities) may hold either:
//   1. An external URL string (e.g. "https://example.com/photo.jpg"), or
//   2. A locally imported asset from `src/assets/webp/` — like the imports
//      shown here. The bundler resolves each import to a hashed URL string
//      at build time, so the field type stays `string` in both cases.
//
// To add a new local image: drop the file into `src/assets/img/`, convert to WebP,
// import it with a relative path (`../assets/webp/<filename>.webp`), and use it as the
// `image` value. Omit or empty the field to fall back to a blank placeholder.
import ur5Image from "../assets/webp/ur5.webp";
import droneImage from "../assets/webp/drone.webp";
import alf01475Image from "../assets/webp/facility/ALF01475.webp";
import alf01485Image from "../assets/webp/facility/ALF01485.webp";
import alf01431Image from "../assets/webp/facility/ALF01431.webp";
import alf01433Image from "../assets/webp/facility/ALF01433.webp";
import alf01471Image from "../assets/webp/facility/ALF01471.webp";
import alf01434Image from "../assets/webp/facility/ALF01434.webp";
import alf01460Image from "../assets/webp/facility/ALF01460.webp";
import alf01450Image from "../assets/webp/facility/ALF01450.webp";
import alf01476Image from "../assets/webp/facility/ALF01476.webp";
import alf01480Image from "../assets/webp/facility/ALF01480.webp";

// Facilities are stored as a single flat list so the facility tab renders one
// combined catalogue instead of one section per laboratory room. Each entry
// carries its `room` code, which is used purely as a metadata label.
export const equipmentEN = {
  sectionLabel: "Facilities",
  heading: "Our",
  headingAccent: "Laboratories",
  body: "The Robotics & Intelligent Systems Lab operates across three dedicated rooms, each set up for a different part of our work from heavy manipulation and fabrication through to embedded prototyping, networking, and software development.",
  facilitiesLabel: "Facilities",
  clickForMoreInfo: "Click for more info",
  viewAll: "View All Equipment",
  image: alf01475Image,
  labRooms: [
    {
      code: "TW2-901",
      name: "TW2-901 Laboratorium",
      description:
        "The main research floor. This room houses our collaborative robot arms, mobile robot platforms, and the vision and compute hardware that drives them. Most of the lab's ongoing research projects are run here, and it is also where student final projects and thesis experiments are set up.",
      images: [alf01476Image, alf01480Image, alf01475Image],
    },
    {
      code: "B401",
      name: "B401 Laboratorium",
      description:
        "The automation and electronics room. Equipped for hardware bring up, PCB work, and pneumatic control, this room supports the practicum sessions as well as hands on development of the lab's embedded and automation projects.",
      images: [],
    },
    {
      code: "A108",
      name: "A108 Laboratorium",
      description:
        "The computing and networking room. Focused on software, wireless systems, and embedded development, this room is where most of our IoT and wireless sensor network work takes place, along with general software development and simulation.",
      images: [],
    },
  ],
  facilities: [
    {
      name: "UR5e Collaborative Robot Arm",
      category: "Robotics",
      room: "TW2-901",
      image: ur5Image,
      description:
        "A 6-DOF collaborative robot arm from Universal Robots with a 5 kg payload and 850 mm reach. Used for manipulation research, pick and place tasks, and integration with vision pipelines. Supports ROS 2 drivers and safety rated force sensing for human robot collaboration experiments.",
    },
    {
      name: "Drone",
      category: "Robotics",
      room: "TW2-901",
      image: droneImage,
      description:
        "Differential drive mobile bases running ROS 2 Humble. Equipped with wheel encoders, IMU, and lidar, used for SLAM, path planning, and autonomous navigation research. Students use them for coursework and for their final project demonstrations.",
    },
    {
      name: "Dobot",
      category: "Robot",
      room: "TW2-901",
      image: alf01485Image,
      description:
        "D435i and D455 depth cameras providing RGB, depth, and IMU streams. Used for object detection, pose estimation, and hand eye calibration on the robot arm. Supported in ROS 2 via the realsense2_camera package.",
    },
    {
      name: "3d Print",
      category: "Computing",
      room: "TW2-901",
      image: alf01431Image,
      description:
        "Jetson Orin Nano and Xavier NX edge compute modules. Used to run perception and inference workloads directly on the robots, keeping latency low. Support CUDA, TensorRT, and PyTorch for on device machine learning.",
    },
    {
      name: "Printer",
      category: "Prototyping",
      room: "TW2-901",
      image: alf01433Image,
      description:
        "FDM 3D printers with PLA, PETG, and TPU capability. Used to fabricate custom brackets, sensor mounts, and enclosures for lab projects. Print bed is 220 × 220 × 250 mm.",
    },
    {
      name: "Solder Station",
      category: "",
      room: "TW2-901",
      image: alf01471Image,
      description: "",
    },
    {
      name: "High End PC RTX 4090",
      category: "",
      room: "TW2-901",
      image: alf01434Image,
      description: "",
    },
    {
      name: "Turtle bot",
      category: "",
      room: "TW2-901",
      image: alf01460Image,
      description: "",
    },
    {
      name: "Turtlebot waffle",
      category: "",
      room: "TW2-901",
      image: alf01450Image,
      description: "",
    },
    {
      name: "DJI Matrice 300 RTK Drone",
      category: "UAV",
      room: "B401",
      image: droneImage,
      description:
        "Industrial quadcopter platform with a 55 minute flight time and IP45 rating. Used for aerial mapping, inspection research, and multi UAV coordination experiments. Supports RTK positioning for centimetre level accuracy.",
    },
  ],
} as const;