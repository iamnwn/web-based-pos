import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="w-dvw h-dvh bg-black">
      <h1 className="text-white">Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <Button onClick={goBack}>Go Back</Button>
      </div>
    </section>
  );
};

export default Unauthorized;
