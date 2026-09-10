"use client";
import style from "./Service.module.css";

export default function Service() {
  return (
    <section className={style.serviceContainer}>
        <div className={style.serviceContainerWrapper}>
            <h3 className={style.serviceContainerHeader}>OUR SERVICE</h3>
            <h2 className={style.serviceContainerSubheader}>What We Do To Uplift Lives</h2>
        
            <div className={style.serviceCardHolder}>
                <div className={style.serviceCards}>
                    <img src="./food-icon.png" className={style.serviceIcons}/>
                    <h3 className={style.serviceCardHeader}>Feeding and Relief Programs</h3>
                    <p className={style.serviceCardParagraph}>EDHF Nigeria provides food and essential relief materials to individuals and families in need, addressing immediate hunger and basic necessities.</p>
                </div>
                <div className={style.serviceCards}>
                    <img src="./empowerment.png" className={style.serviceIcons}/>
                    <h3 className={style.serviceCardHeader}>Youth Empowerment Initiatives</h3>
                    <p className={style.serviceCardParagraph}>The foundation offers skill acquisition programs, mentorship, and support to young people, enabling them to become self-reliant and productive members of society.</p>
                </div>
                <div className={style.serviceCards}>
                    <img src="./scholarship.png" className={style.serviceIcons}/>
                    <h3 className={style.serviceCardHeader}>Educational Support Scholarships & Grants</h3>
                    <p className={style.serviceCardParagraph}>EDHF supports the education of underprivileged children and youths by providing scholarships and financial assistance, ensuring access to quality education.</p>
                </div>
                <div className={style.serviceCards}>
                    <img src="./community.png" className={style.serviceIcons}/>
                    <h3 className={style.serviceCardHeader}>Community Advocacy and Enlightenment</h3>
                    <p className={style.serviceCardParagraph}>Through community outreach programs, EDHF raises awareness on social issues, educates communities, and advocates for the rights and welfare of the marginalized.</p>
                </div>
            </div>
        </div>
        
    </section>
  );
}