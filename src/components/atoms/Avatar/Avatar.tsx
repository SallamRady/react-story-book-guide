import "./Avatar.css";

type PropsT = {
  border?: boolean;
};
export default function AvatarAtom({ border = true }: PropsT) {
  return (
    <img
      src="https://thispersondoesnotexist.com"
      alt="AI Generated Face"
      style={{
        border: border ? "3px solid lightcoral" : "none",
      }}
    />
  );
}
