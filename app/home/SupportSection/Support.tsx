"use client";
import Link from "next/link";
import style from "./Support.module.css";

export default function Support() {
  return (
    <section className={style.supportSection}>
      <div className={style.wrapper}>
        
        {/* LEFT CONTENT */}
        <div className={style.left}>
          <h3 className={style.tag}>SUPPORT</h3>

          <h2 className={style.title}>
            Helping us spread hope.
          </h2>

          <p className={style.description}>
            We trust that humans have so much go and love to offer one
            another, and the world, provided that the condition and
            enngvironment is enabling to nurture these inherent ‘good’.
            Bei conscious of this, we set out, and have made it our
            goal to build communities, encourage co-operations, inspire
            selfless service, and be an example of sanity to be emulated
            for positive change.
          </p>
           <Link href="/donate">
            <div className={style.donateHolder}>
                <button className={style.donateBtn}>Donate</button> 
                <img src="./Group.png"  className={style.donateBtnIcon}/>
            </div>
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className={style.right}>
          
          <div className={style.cardTopLeft}>
            <h3>570+</h3>
            <p className={style.wrapIcon}><img src="./fam.png" width={30}/> Families Reached</p>
          </div>

          <div className={style.cardTopRight}>
            <h3>7K+</h3>
            <p className={style.wrapIcon}><img src="./peo.png" width={30}/> People supported</p>
          </div>
            
       
            <img src="./Vector.png" className={style.cardBottomLeft}/>

            <div className={style.cardBottom}>
                <h3>50+</h3>
                <p className={style.wrapIcon}><img src="./vol.png" width={30}/> Volunteers</p>
       
            </div>
           <img src="./Vector2.png" className={style.cardBottomRight}/>

        </div>
      </div>
    </section>
  );
}
