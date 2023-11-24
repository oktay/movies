import { PiStar, PiStarFill, PiStarHalfFill } from "react-icons/pi";

export default function Rating({ average }: { average: number }) {
  const rate = average / 2;

  return (
    <div className="flex text-blue-500">
      {[...Array(5)].map((_, index) =>
        rate % 1 !== 0 && index === Math.floor(rate) ? (
          <PiStarHalfFill key={index} />
        ) : index < rate ? (
          <PiStarFill key={index} />
        ) : (
          <PiStar key={index} />
        )
      )}
    </div>
  );
}
