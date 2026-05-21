// src/pages/Home.jsx
import HeroSection   from "../components/HeroSection";
import FeaturesStrip from "../components/FeaturesStrip";
import BodyPicker    from "../components/BodyPicker";

export default function Home({ setPage, setBodyPart }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <FeaturesStrip />
      <BodyPicker setPage={setPage} setBodyPart={setBodyPart} />
    </>
  );
}
