"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import style from "./Project.module.css";


const projects = [
  {
    title: "Feeding Hope: Our COVID-19 Response",
    subtitle: "This marked the first project of our foundation",
    image: "/first.png",
    para1: "During the two-week government-imposed lockdown aimed at curbing the spread of COVID-19 in Nigeria, our food bank initiative was born. Recognizing the dire need for food assistance among the already impoverished citizens, we took swift action. As an organization, we committed to feeding over 1,000 families, which translated to supporting more than 5,000 individuals during these challenging times. In the face of economic hardship, widespread job loss, and the uncertainty brought on by the lockdown, we distributed essential food items that sustained many. Our efforts included providing staples such as rice, beans, noodles, and garri, etc which offered much-needed relief to those struggling to make ends meet. Our outreach focused on the Ajegunle community, particularly targeting areas like Tolu Roads, JMJ Quarters, Wilmer, and Babatunde Street. By single-handedly delivering food supplies to these locations, we brought hope and stability to countless households.",
    para2: "This initiative marked the first project of our foundation since its inception. The impact of our work was profound, offering not just sustenance, but also a sense of hope and community solidarity during an unprecedented crisis. Our commitment to supporting vulnerable populations continues, and we remain dedicated to making a positive difference in the lives of those in need.",
    para3: "",
    para4: "",
    para5: "",
    para6: "",
  },
  {
    title: "Beauty Pageant",
    subtitle: "Celebrating Elegance and Empowerment",
    image: "/second.png",
    para1: "The Elisha Development and Humanitarian Foundation recently hosted a spectacular beauty pageant at the prestigious Abayomi Hall in Orege, showcasing the elegance, talent, and intelligence of young women from Ajegunle. This event, aimed at empowering women and fostering community pride, was a resounding success.",
    para2: "The beauty pageant featured over 20 contestants in the preliminary rounds, with 12 finalists advancing to the final stage. These beautiful and accomplished ladies, aged 18 to 28, represented the diverse talents within our community. Among the contestants were a dentist, an undergraduate architect, and various other professionals and students.",
    para3: "Preliminary and Final Stages: After the preliminaries, the finalists were treated to a luxurious stay in a conducive hotel for three days. This period included visits to significant cultural and historical sites, such as the Lekki Conservation Centre and the Badagry Slave Trade Museum. These excursions provided the contestants with opportunities to unwind, bond, and gain valuable insights into the region's history.",
    para4: "The competition culminated in a grand finale where the following prizes were awarded: - Winner: 500,000 Naira - First Runner-Up: 300,000 Naira - Second Runner-Up: 200,000 Naira. Additionally, each contestant received 100,000 Naira to compensate for their expenses during the competition, recognizing their dedication and effort. Special awards were also given for: - Best Dressed, - Best Hairdo, - Best Makeup",
    para5: "The Elisha Development and Humanitarian Foundation Beauty Pageant was more than just a competition; it was a celebration of the potential and accomplishments of young women in Ajegunle. By highlighting their talents and providing substantial financial rewards, the event aimed to empower these women to pursue their dreams and make meaningful contributions to their community. The beauty pageant stands as a testament to the Elisha Development and Humanitarian Foundation's commitment to promoting cultural pride and personal development. We are proud to have provided a platform for these remarkable women to shine and are excited to see how they will continue to inspire and lead in their respective fields.",
    para6: "For more information about our events and initiatives, or to support our efforts, please visit our website or contact us directly. Together, we can continue to empower and uplift the community of Ajegunle.",
  },
  {
    title: "Ajegunle Spelling Bee",
    subtitle: "Empowering Education Through Friendly Competition",
    image: "/third.png",
    para1: "The Ajegunle Spelling Bee, organized by the Elisha Development and Humanitarian Foundation, is a bi-annual competition designed to foster educational excellence among primary and secondary school students in Ajegunle. This initiative is part of our commitment to enhancing education and reducing dropout rates and hooliganism in the community.",
    para2: "The competition is exclusively for students residing in Ajegunle, ensuring that the benefits of the event are concentrated within our community. Participants are divided into four categories: 1. Lower Primary: Primary 1-3. 2. Upper Primary: Primary 4-6. 3. Junior Secondary: JSS 1-3. 4. Senior Secondary: SS1-3.",
    para3: "1. Preliminaries All registered participants compete in the preliminary rounds, where the initial pool of competitors is narrowed down through a series of spelling challenges. 2. Finals: The finalists from each category, who successfully pass the preliminaries, compete for the top positions. To encourage participation and reward excellence, all participants receive essential writing materials, including books, pens, pencils, dictionaries, and bags. These resources are intended to support their ongoing educational journey. The four winners, one from each category, are awarded a scholarship of 250,000 Naira to fund their education. This substantial financial support is our way of investing in the future of these bright students and alleviating some of the financial burdens associated with their schooling.",
    para4: "The Ajegunle Spelling Bee is more than just a competition; it is a strategic initiative aimed at: -Promoting Education: By providing scholarships and educational materials, we motivate students to stay in school and strive for academic excellence. - Reducing Dropout Rates: Financial incentives and recognition help reduce dropout rates by making education more accessible and appealing. - Combatting Hooliganism: By engaging young minds in constructive and educational activities, we steer them away from negative influences and behaviours.",
    para5: "It exemplifies the Elisha Development and Humanitarian Foundation's dedication to uplifting our community through education. By nurturing the intellectual abilities of our young students and providing them with the resources they need to succeed, we aim to build a brighter, more educated future for Ajegunle.",
    para6: "For more information about the Ajegunle Spelling Bee or to support our initiatives, please contact us or visit our website. Together, we can make a lasting impact on the lives of the children in our community.",
  },
  {
    title: "Talent Expo",
    subtitle: "Showcasing Ajegunle’s Finest Talents",
    image: "/fourth.png",
    para1: "The Talent Expo, a bi-annual competition organized by the Elisha Development and Humanitarian Foundation, has been a highlight of Ajegunle's cultural calendar since its inception in 2021. This event brings together the community's most talented individuals, providing a platform for them to showcase their skills and gain recognition for their artistry.",
    para2: "The Talent Expo is open exclusively to residents of Ajegunle, ensuring that the spotlight remains on local talent. Participants compete in a variety of categories, including singing, dancing, poetry, drama, and spoken word. The competition is designed to uncover and nurture the rich artistic talents within the community.",
    para3: "The first stage is the preliminaries and then the finals. - Preliminaries: The competition begins with preliminary rounds, where over 40 participants display their talents. - Finals: The top 15 contestants from the preliminaries advance to the finals, where they compete for the top prizes.",
    para4: "The Talent Expo offers substantial cash prizes to support the winners in furthering their crafts: - Winner: 500,000 Naira - First Runner-Up: 300,000 Naira - Second Runner-Up: 200,000 Naira. These prizes are intended to help the winners develop their talents, purchase necessary equipment, and gain opportunities for further exposure.",
    para5: "The Talent Expo is not just a competition; it is a celebration of Ajegunle's cultural diversity and creativity. It provides participants with: - Exposure: The winners are invited to perform at all major events organized by the Elisha Development and Humanitarian Foundation, giving them valuable opportunities to showcase their talents to larger audiences. - Support for Craft: The cash prizes offer financial support that can be used to enhance their skills and career prospects. - Community Engagement: By bringing together artists from various disciplines, the Talent Expo fosters a sense of community and encourages collaboration among local talents.",
    para6: "It has quickly become a cornerstone event for Ajegunle, reflecting the vibrant and dynamic talent that exists within the community. Organized by the Elisha Development and Humanitarian Foundation, this competition not only highlights individual talents but also contributes to the cultural enrichment of the entire community. As we look forward to future editions of the Talent Expo, we remain committed to our mission of empowering local talents and providing them with the resources and opportunities they need to succeed. For more information about the Talent Expo or to support our initiatives, please contact us or visit our website. Together, we can continue to celebrate and nurture the artistic spirit of Ajegunle.",
  },
   {
    title: "Elisha Elderly Care Services",
    subtitle: "Constant Support to the Aged, Sick, and Needy",
    image: "/fifth.jpeg",
    para1: "Elisha Elderly Care Services: Providing Constant Support to the Aged, Sick, and Needy At Elisha Development and Humanitarian Foundation, we believe that every individual deserves care, dignity, and respect, regardless of their age or health condition. This belief is the driving force behind our Elisha Elderly Care Services project, a dedicated initiative focused on providing continuous support to the aged, sick, and needy individuals in our community.",
    para2: "Mission and Vision: Elisha Elderly Care Services was established to address the growing need for specialized care for elderly and sick individuals who lack family support. Our mission is to ensure that these vulnerable members of society receive the medical attention, companionship, and sustenance they need to lead healthier and more fulfilling lives.",
    para3: "Comprehensive Care for the Elderly and Sick: Through our Elisha Elderly Care Services, we have assembled a dedicated team of nurses and caregivers who visit the homes of elderly and sick individuals on a bi-weekly or tri-weekly basis. Our nurses perform several critical functions during these visits: 1. Health Check-ups: Regular health assessments to monitor the well-being of our beneficiaries. 2. Medication Administration: Administering medicines as prescribed by their doctors, ensuring adherence to medical advice. 3. Companionship: Building rapport and maintaining communication with our beneficiaries to combat loneliness and isolation.",
    para4: "Monthly Nutritional Support: In addition to medical care, we recognize the importance of proper nutrition for the health and well-being of the elderly and sick. Each month, our team provides raw food rations to our beneficiaries, including essential items such as rice, beans, oil, wheat, and other provisions. These food supplies are crucial for their sustenance, ensuring they have the necessary nutrients to maintain their health.",
    para5: "Impact and Community Involvement: The impact of Elisha Elderly Care Services extends beyond providing immediate care and support. By fostering a sense of community and belonging, we help our beneficiaries feel valued and respected. Our nurses' regular visits not only address physical health needs but also offer emotional support, significantly enhancing their quality of life.",
    para6: "How You Can Help: Elisha Elderly Care Services relies on the generosity of donors and volunteers to continue its vital work. We invite individuals, businesses, and organizations to join us in our mission. Whether through financial contributions, volunteering time, or donating food and medical supplies, your support can make a meaningful difference in the lives of the elderly and sick in our community. Elisha Elderly Care Services stands as a testament to the power of compassion and community. By providing constant support to the aged, sick, and needy, we reaffirm our commitment to creating a more inclusive and caring society. Together, we can ensure that no one is left behind and that every individual receives the care and respect they deserve. For more information on how to support Elisha Elderly Care Services, please visit our website or contact us directly. Your involvement can help us continue to make a positive impact in the lives of those who need it most.",
  },
   {
    title: "Football Tournament",
    subtitle: "The Elisha Foundation U-19 Football Tournament",
    image: "/sixth.jpeg",
    para1: "Football, the world’s most popular ball game, is synonymous with one thing regardless of where you watch it: passion. This passion drives fans to stadiums, glues them to their TV screens, and makes every suspenseful dribble and winning goal a moment of pure exhilaration. No matter which corner of the globe you are in, the love for football remains steadfast and unchanging.",
    para2: "The Elisha Foundation U-19 Football Tournament is a testament to this universal passion. In 2021, the Elisha Development and Humanitarian Foundation organized an electrifying football tournament in Ajegunle, featuring over 20 teams. The Navy Barracks field at Boundary hosted this thrilling event, where each match was a showcase of skill, determination, and the desire to clinch the grand prize of 500,000 Naira. In addition to the grand prize, Mr. Elisha, the foundation's founder, generously awarded 20,000 Naira to the losing teams and 10,000 Naira to the winners of each match throughout the tournament.",
    para3: "The final match of the Ajegunle Under-19 Football Tournament took place at the Nigeria Navy Barracks on Mobil Road on July 18, 2021. The event kicked off with an opening ceremony at 3:00 PM, followed by the eagerly anticipated match at 4:00 PM. The final showdown saw United Ajax Soccer Academy pitted against AJ Chelsea Football Club. AJ Chelsea emerged victorious, their jubilation and excitement filling the entire arena. The display of affection and joy was a sight to behold, capturing the essence of football's unifying spirit.",
    para4: "In recognition of their excellent performance throughout the tournament, referees, and the 3rd, 2nd, and 1st place teams were awarded medals. The top three teams received trophies and cash prizes, with the rewards distributed as follows: - 1st Place: 500,000 Naira - AJ Chelsea Football Club, - 2nd Place: 300,000 Naira - United Ajax Soccer Academy, - 3rd Place: 200,000 Naira – Christ Ambassador",
    para5: "Commendation prizes of 50,000 Naira were also awarded in various categories: - Best Behaved Team: Klassisch Football Academy, - Best Coach: Kehinde Ogundoghone of Young Star Football Club, - Highest Goal Scorer: Joseph Aderibole of Young Star Football Club, - Most Valuable Player: Lajuwomi Moses Adeyemi of Young Star Football Club, - Best Keeper: Tosin Emoruwa of AJ Chelsea Football Club",
    para6: "The Elisha Foundation U-19 Football Tournament not only celebrated the talent and passion of young footballers but also fostered a sense of community and sportsmanship. The event was a resounding success, highlighting the joy and unity that football brings to people from all walks of life.",
  },
    {
    title: "Crusade for Awareness",
    subtitle: "Empowering the Community Against Abuse",
    image: "/seventh.jpeg",
    para1: "In March 2022, the Elisha Development and Humanitarian Foundation launched its first edition of the 'Crusade for Awareness,' a groundbreaking initiative aimed at enlightening the public on critical issues such as domestic violence, child abuse and neglect, and sexual abuse and assault. This pioneering event featured personal development coaches, public speakers, and an esteemed panel of judges who shared invaluable insights on how to address and combat these pressing social issues.",
    para2: "Building on the success of the inaugural event, we are proud to announce the second edition of the 'Crusade for Awareness.' This outreach program continues to invite distinguished speakers to educate and empower the community on the dangers of domestic violence, sexual abuse, rape, and unhealthy living. At the Elisha Foundation, we are deeply committed to the development and well-being of our community, striving for the betterment of every resident, young and old alike.",
    para3: "A central message from our discussions on abusive relationships and marriages is the importance of recognizing when it is necessary to leave. For individuals trapped in such situations, understanding that one's safety and life take precedence over the relationship is crucial. Marriages should never be a matter of life and death. Similarly, dealing with an unfaithful partner is undoubtedly painful, but self-blame is never the answer. Our program emphasizes self-worth and the importance of making decisions that prioritize one's well-being and safety.",
    para4: "The second edition of the 'Crusade for Awareness' promises to be an enlightening and transformative event. Our mission is to create a platform where every citizen can excel, fostering a safe, informed, and supportive community. We invite you to join this yearly awareness program. Together, we can make a difference, fostering a community where every individual is empowered and equipped to lead a healthy and safe life.",
    para5: "",
    para6: "",
  },
   {
    title: "Light up Ajegunle",
    subtitle: "Illuminating the Future of Our Community",
    image: "/eight.jpeg",
    para1: "In August 2020, the Elisha Development and Humanitarian Foundation launched an ambitious project titled 'LIGHT UP AJEGUNLE.' This initiative aimed to transform the streets of Olodi-Apapa, Ajegunle, Lagos, by installing street lights in key areas, including Aminatu, Mission, Oluwa, Oguntimehin, Oguntokun, Omowale streets, and Tolu Road. With a significant investment of millions of naira, we purchased state-of-the-art solar lights. The project enlisted the expertise of local carpenters, welders, and our dedicated volunteers, who worked tirelessly to ensure the lights were securely installed and operational.",
    para2: "Our volunteers' commitment was extraordinary, as they moved from one electric pole to another, ensuring every light was perfectly positioned. The community, especially the elderly, expressed immense gratitude, recognizing the positive impact on security and the reduction of theft and crime.",
    para3: "The installation of street lights has been transformative for the neighbourhoods involved. The enhanced lighting has: - Reduced theft and robbery, making the streets safer at night. - Improved the overall sense of security among residents. - Contributed to the beautification of the area, encouraging more community activities after dark. - Boosted economic activities by making markets, bus stops, and corners more accessible and safer.",
    para4: "Despite these successes, recent checks revealed that some street lights have become non-functional, and certain streets have yet to be covered. This discovery has prompted us to seek additional support from the public to continue and expand our efforts. On August 5, 2022, our team and volunteers returned to the streets of Olodi-Apapa to repair and replace the street lights installed in 2020. The positive feedback from the community has reinforced our commitment to this vital project. Reports indicate that the improved lighting has significantly helped individuals and the community at large, reducing crime and enhancing the quality of life.",
    para5: "Lighting the streets at night is crucial for curbing crime and fostering a safer, more vibrant community. We aim to extend this initiative to cover even more streets, illuminating markets, bus stops, and isolated parts of Ajegunle. We invite you to join us in this mission. Together, we can create a brighter, safer future for everyone. Remember, darkness cannot overshadow the power of light. Let's come together to light up Ajegunle and build a secure and thriving community.",
    para6: "For more information or to support the 'LIGHT UP AJEGUNLE' project, please contact us through our website or social media channels. Your contribution can make a significant difference. Elisha Ajose and the Elisha Development and Humanitarian Foundation remain dedicated to enhancing the security and well-being of our communities. Your support is invaluable as we continue to light up the lives of those in Ajegunle.",
  },
];

const ITEMS_PER_PAGE = 4;

export default function ProjectCarousel() {
  const [page, setPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const visibleProjects = projects.slice(start, start + ITEMS_PER_PAGE);

  /* Lock scroll + ESC close */
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selectedProject]);

  return (
    <section className={style.projectsSection}>
      <div className={style.projectsSectionWrapper}>
        <h3 className={style.sectionTag}>OUR PROJECT</h3>
        <h2 className={style.sectionTitle}>
          Transforming Lives Through Purposeful Projects
        </h2>

        <div className={style.projectsWrapper}>
          {visibleProjects.map((project, index) => (
            <div
              className={style.projectCard}
              key={index}
              onClick={() => setSelectedProject(project)}
            >
              <div className={style.imageWrapper}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={style.projectImage}
                />
              </div>
              <h3>{project.title}</h3>
              <p>{project.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className={style.pagination}>
          <button
            className={style.arrow}
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ←
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`${style.pageNumber} ${
                page === i + 1 ? style.pageNumberActive : ""
              }`}
              onClick={() => setPage(i + 1)}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}

          <button
            className={style.arrow}
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            →
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}

      {selectedProject && (
        <div
          className={style.modalOverlay}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={style.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={style.closeBtn}
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <div className={style.modalImageWrapper}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className={style.projectImage2}
              />
            </div>

            <h2 className={style.modalTitle}>
              {selectedProject.title}
            </h2>

            <div className={style.modalText}>
              {[1,2,3,4,5,6].map((num) => {
                const text = selectedProject[`para${num}`];
                return text ? <p key={num}>{text}</p> : null;
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}