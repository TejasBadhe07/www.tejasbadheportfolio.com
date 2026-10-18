import { SiNextdotjs, SiReact, SiTypescript, SiPython, SiFlask, SiNodedotjs, SiPostgresql, SiMongodb, SiTensorflow, SiPytorch, SiOpencv, SiThreedotjs, SiSupabase } from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const items = [
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "React", icon: <SiReact /> },
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Python", icon: <SiPython /> },
  { name: "Flask", icon: <SiFlask /> },
  { name: "Node.js", icon: <SiNodedotjs /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Supabase", icon: <SiSupabase /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "TensorFlow", icon: <SiTensorflow /> },
  { name: "PyTorch", icon: <SiPytorch /> },
  { name: "OpenCV", icon: <SiOpencv /> },
  { name: "Three.js", icon: <SiThreedotjs /> },
  { name: "AWS", icon: <FaAws /> },
];

export default function Marquee() {
  // The list is drawn twice so the loop is seamless
  return (
    <div className="marquee" aria-label="Technologies I work with">
      <div className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= items.length}>
            {item.icon}
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
