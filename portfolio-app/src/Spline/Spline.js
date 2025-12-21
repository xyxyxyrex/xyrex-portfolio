import Spline from '@splinetool/react-spline';
import './Spline.css';

export default function SplineModel() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <Spline
        scene="https://prod.spline.design/nG49ZLlfxe5jBtwj/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
