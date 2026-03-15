import LandingPage from "@/features/landing/components/LandingPage";
import { mockedLandingData } from "@/features/landing/utils/mockedLandingData";

export default function Home() {
  return <LandingPage data={mockedLandingData} />;
}
