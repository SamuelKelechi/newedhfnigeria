import styles from "./about.module.css";

interface MemberProps {
  name: string;
  position: string;
  image: string;
}

const Member = ({name, position, image}: MemberProps) => {
  return (
    <div
      className={styles.memberCard}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    >
      <div className={styles.memberDetail}>
        <h3>{name}</h3>
        <p>{position}</p>
      </div>
    </div>
  );
};

export default Member;
