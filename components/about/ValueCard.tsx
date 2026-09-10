import styles from "./about.module.css";

interface ValueCardProps {
  title: string;
  subtitle: string;
  description: string;
}
  const ValueCard = ({ title, subtitle, description }: ValueCardProps) => {
  return (
    <div className={styles.coreValuesCard}>
      <div>
        <h4>{title}</h4>
        <h3>{subtitle}</h3>
      </div>
      <p>
        {description}
      </p>
    </div>
  );
};

export default ValueCard;
