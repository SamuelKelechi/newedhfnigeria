import styles from "./about.module.css";
import Member from "./Member";

const Team = () => {
  const teamMembers = [
    {
      name: "Elisha Ajose",
      position: "Founder/Chairman",
      image: "/Mr.Elisha.jpg",
    },
    {
      name: "James Adeleye Adesuyi",
      position: "Treasurer/Acting Head",
      image: "/Mr.James.jpg",
    },
    {
      name: "Titilope Mercy Olumofin",
      position: "Secretary",
      image: "/Mrs.Titi.jpg",
    },
    {
      name: "Toyin Alicia Johnson",
      position: "Social Worker",
      image: "/Miss.Toyin.jpg",
    },
    {
      name: "Vanessa Linda Gakwe",
      position: "Social worker",
      image: "/Mrs.Vanessa.jpg",
    },
    {
      name: "Motunrayo Uaboi",
      position: "Social worker",
      image: "/Mrs.Motunrayo.jpg",
    },
    {
      name: "Olamide Akingbe",
      position: "Social worker",
      image: "/Sir.Olamide.jpg",
    },
    {
      name: "Emmanuel Johnson",
      position: "Social worker",
      image: "/Sir.Emmanuel.jpg",
    },
  ];
  return (
    <div className={styles.teamSection}>
      <div className={styles.teamSectionHeader}>
        <h1>meet our team</h1>
        <p>The People Who Make It Happen</p>
      </div>
      <div className={styles.teamContainer}>
        {teamMembers.map((value, index) => (
          <Member
            key={index}
            name={value.name}
            position={value.position}
            image={value.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
