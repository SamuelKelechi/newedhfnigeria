import AsteriskIcon from "./AsteriskIcon";
import ValueCard from "./ValueCard";
import styles from "./about.module.css";

const ValuesSection = () => {
  const values = [
    "Compassion",
    "Dignity",
    "Empowerment",
    "Integrity",
    "Community Transformation",
  ];

  const coreValues = [
    {
      title: "FEEDBACKS",
      subtitle: "Our Vision",
      description:
        "Our vision is: building people with dignity and self-worth. Every human being should have the same opportunity.",
    },
    {
      title: "FEEDBACKS",
      subtitle: "Our mission",
      description:
        "To advocate for community development, basic human right and welfare. To create platform where every citizen can excel.",
    },
    {
      title: "FEEDBACKS",
      subtitle: "Our Volunteer",
      description:
        "This is a place where you get to bring your full self, to serve, to impart knowledge, and to create values worth emulating",
    },
  ];

  return (
    <section className={styles.valuesSection}>
      {/* <div className={styles.valuesSectionWrapper}> */}

      <div className={styles.marquee}>
        <div className={styles.marqueeInner}>
          {values.map((value, index) => (
            <span
              className={styles.valueItem}
              key={index}
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#8E8E8E",
                lineHeight: "1.65rem",
              }}
            >
              {value}

              {index !== values.length - 1 && (
                <AsteriskIcon
                  style={{
                    marginLeft: "2.39rem",
                    marginRight: "2.39rem",
                    verticalAlign: "middle",
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.coreValues}>
        <h1 className={styles.coreValuesHeader}>
          OUR CORE VALUES
        </h1>

        <div className={styles.coreValuesPetals}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="102"
            height="40"
            viewBox="0 0 102 40"
            fill="none"
          >
            <path
              d="M39.7219 5.79755C45.2937 7.58431 58.6533 4.90417 58.6533 2.00672C58.6533 0.437266 50.3589 -0.625132 45.9901 0.41312C38.3289 2.19988 35.6696 4.4937 39.7219 5.79755ZM48.2695 1.88599C51.6253 0.751156 52.9549 0.871884 52.9549 1.69283C52.9549 2.46548 49.0926 4.10737 45.8635 4.73515C41.748 5.55609 43.0143 3.64861 48.2695 1.88599Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />

            <path
              d="M64.795 26.3453C57.0704 28.3494 56.0573 33.2268 63.402 33.2268C68.4673 33.2268 78.2813 29.4842 78.2813 27.5526C78.2813 25.79 69.8602 25.0173 64.795 26.3453ZM63.0221 32.0195C62.389 31.9954 64.2884 29.8464 66.1246 28.4701C68.1507 26.9731 72.013 26.1519 72.8994 27.0453C73.6592 27.6972 67.201 32.1161 63.0221 32.0195Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />

            <path
              d="M37.1892 16.0594C31.9973 18.0393 42.1912 24.2932 50.6122 24.2932C56.2473 24.2932 60.0462 19.7536 56.1207 17.6771C52.2584 15.6489 40.7982 14.659 37.1892 16.0594ZM49.1559 22.2409C47.6363 22.603 41.558 19.0295 41.558 17.774C41.558 16.4218 45.9901 16.156 49.0293 17.3632C52.385 18.6912 52.4483 21.4441 49.1559 22.2409Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />

            <path
              d="M92.3367 11.2061C91.0704 11.0612 89.0449 10.6991 87.8419 10.3852C84.866 9.61251 81.257 9.58836 79.9274 10.361C75.5586 12.9687 78.4078 15.7213 87.8419 18.0393C95.7564 19.9709 100.062 19.3916 101.771 16.2044C102.974 13.8623 99.3647 11.9788 92.3367 11.2061ZM93.2237 16.2766C92.8438 16.663 91.6408 16.7598 90.8177 16.4942L88.8543 15.7937C83.3458 13.8138 82.0168 11.0132 86.5122 11.0132C88.0951 11.0132 88.3484 11.0854 87.7152 11.351C87.1454 11.6166 87.6519 11.9066 90.5011 12.8241C94.4267 14.0555 94.8066 14.6106 93.2237 16.2766Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />

            <path
              d="M22.373 29.6291C19.8404 29.2669 18.0681 29.3152 16.4852 29.7981C9.33054 32.0195 9.83707 39.0941 17.1184 39.3114C28.4519 39.6253 33.0101 31.1502 22.373 29.6291ZM17.8782 36.8485C16.9285 36.4864 17.3083 34.434 18.7013 32.8887C20.7274 30.6673 22.2464 30.2568 23.3227 31.6814C24.2725 32.9853 19.5877 37.4763 17.8782 36.8485Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />

            <path
              d="M5.15139 6.42535C6.54434 4.71102 -4.97916 2.58622 -8.3349 3.96251C-12.0705 5.50782 -15.8062 8.88818 -14.9831 10.0713C-13.2102 12.6549 2.30217 9.854 5.15139 6.42535ZM-10.1711 9.95058C-12.1339 9.41938 -7.5118 7.07727 -5.29574 5.77342C-3.07968 4.46957 -0.863623 4.51786 -0.863623 5.84586C-0.863623 6.25633 -8.20827 10.4576 -10.1711 9.95058Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />

            <path
              d="M-1.81334 17.3874C-7.89167 18.4256 -13.0203 23.0615 -9.53789 24.3895C-4.53593 26.297 5.34136 24.6551 10.28 21.1057C12.9393 19.1741 3.88509 16.3974 -1.81334 17.3874ZM0.655985 22.4823C-4.66255 24.4139 -6.87862 23.1581 -4.53593 21.4679C-1.30682 19.15 4.39162 17.9186 5.02478 19.5363C5.27804 20.1641 3.82178 21.3233 0.655985 22.4823Z"
              fill="#EE5728"
              fillOpacity="0.4"
            />
          </svg>
        </div>

        <div className={styles.coreValuesCardsContainer}>
          {coreValues.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              subtitle={value.subtitle}
              description={value.description}
            />
          ))}
        </div>

        {/* </div> */}
      </div>
    </section>
  );
};

export default ValuesSection;