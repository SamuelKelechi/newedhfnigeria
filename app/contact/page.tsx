import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import "./contactUs.css";

const TwitterXIcon = ({
  className,
}: {
  className?: string;
}) =>  (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  return (
    <main className="mainContainer">

      {/* =====================================================
          HERO
      ===================================================== */}

      <div className="firstContainer">

        <div className="insideFirstContainer">

          <p className="firstPara">
            Get in Touch with Us Today
          </p>

          <h1 className="firstHeader">
            Together, <span>We Can</span> Change Lives!
          </h1>

        </div>


        {/* HERO GRAPHIC */}

        <div className="insideFirstContainer2">

          <div className="roundedFullContainer">

            <div className="roundedFullInnerContainer">

              <div className="roundedFullInnermostContainer">

                <div className="innerCircleContainer">

                  <div className="greenCircleContainer">

                    <div className="green-circle">

                      <svg
                        className="messageIcon"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      </svg>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* FLOATING INDICATORS */}

            <div className="indicatorDot">
              <span className="textIcon">📖</span>
            </div>

            <div className="indicatorDotOrange">
              <span className="textIcon">👤</span>
            </div>

            <div className="indicatorDotPurple">
              <span className="textIcon">👑</span>
            </div>


            {/* FLOATING PILL */}

            <div className="floatingPill">

              <span className="shakeIcon">
                🤝
              </span>

              <span className="labelStyle">
                Reach EDHF
              </span>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          CONTACT + FORM SECTION
      ===================================================== */}

      <div className="secondContainer">

        {/* ===================================================
            LEFT SIDE
        =================================================== */}

        <div className="containerSplit">

          <div className="contentBox">

            <p className="headingStyle">
              Get In Touch
            </p>

            <h1 className="secondHeading">
              You&apos;re Not Alone. We&apos;re Here to Help
            </h1>

          </div>


          {/* CONTACT DETAILS */}

          <div className="contentBox2">

            <div className="contentArea">

              {/* EMAIL */}

              <div className="insideContentArea">

                <div className="contentItem">
                  <Mail />
                </div>

                <div className="contentText">

                  <h1>
                    EMAIL US
                  </h1>

                  <p>
                    infoedhf@gmail.com
                  </p>

                </div>

              </div>


              {/* PHONE */}

              <div className="insideContentArea">

                <div className="contentItem">
                  <Phone />
                </div>

                <div className="contentText">

                  <h1>
                    CALL US
                  </h1>

                  <p>
                    +234 703 395 9010
                  </p>

                </div>

              </div>


              {/* ADDRESS */}

              <div className="insideContentArea">

                <div className="contentItem">
                  <MapPin />
                </div>

                <div className="contentText">

                  <h1>
                    HEADQUARTERS
                  </h1>

                  <p>
                    2, Market Street, Olodi-
                  </p>

                  <p>
                    Apapa, Lagos. Nigeria
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* SOCIAL MEDIA */}

          <div className="socialContainer">

            <p className="follow">
              Follow our social media platform
            </p>

            <div className="socialIcons">

              <div className="socialCircle">
                <Facebook />
              </div>

              <div className="socialCircle">
                <Instagram />
              </div>

              <div className="socialCircle">

                <TwitterXIcon className="iconSize" />

              </div>

              <div className="socialCircle">
                <Youtube />
              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            FORM
        =================================================== */}

        <div className="halfContainerForm">

          <div className="formHeader">

            <h1 className="message">
              Send us a message
            </h1>

          </div>


          {/* FIRST ROW */}

          <div className="firstInputRow">

            <input
              type="text"
              className="inputRow"
              placeholder="First Name"
            />

            <input
              type="text"
              className="inputRow"
              placeholder="Last Name"
            />

          </div>


          {/* SECOND ROW */}

          <div className="firstInputRow">

            <input
              type="email"
              className="inputRow"
              placeholder="Enter email address"
            />

            <input
              type="text"
              className="inputRow"
              placeholder="Subject"
            />

          </div>


          {/* MESSAGE */}

          <div className="textAreaContainer">

            <textarea
              className="largeBox"
              placeholder="message"
            />

          </div>


          {/* SUBMIT */}

          <button className="btn">
            Submit
          </button>

        </div>

      </div>


      {/* =====================================================
          MAP TITLE
      ===================================================== */}

      <div className="bannerContainer">

        <div className="thinBar">

          <h1 className="bannerContent">
            Find Us Where Help Begins
          </h1>

        </div>

      </div>


      {/* =====================================================
          MAP
      ===================================================== */}

      <div className="mapContainer">

        <div className="insideMapContainer">

          <iframe
            src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Elisha%20Foundation%202%20Market%20Street%2C%20Ajegunle%2C%20Ajeromi%20Ifelodun&t=&z=14&ie=UTF8&iwloc=B&output=embed"
            className="mapContent"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </div>

    </main>
  );
}