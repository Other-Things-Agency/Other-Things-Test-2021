import React from "react";
import PropTypes from "prop-types";
import Image from "../Global/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pin from "../../images/pin.svg";
import { Tween, SplitChars } from "react-gsap";

const Progress = (props) => {
  const {
    teamA,
    teamB,
    progressTeamA,
    progressTeamB,
    imageProgressA,
    imageProgressB,
    deadline,
  } = props;

  const rand = Math.floor(Math.random() * 5);

  const quotesA = [
    teamA + " take the lead",
    teamA + " are in front",
    teamA + " push on ahead",
    teamA + " take the wheel",
    teamA + " are in the lead",
  ];

  const quotesB = [
    teamB + " take the lead",
    teamB + " are in front",
    teamB + " storm ahead",
    teamB + " take control",
    teamB + " dive in front of " + teamA,
  ];

  return (
    <section className="position-relative">
      <div className="brand-background-blue-dark py-5 position-relative">
        <div className="container">
          <div className="text-center brand-font brand-text-white mb-3">
            <span className="fs-4">
              <Tween from={{ opacity: 0 }} stagger={0.05} delay="2">
                <SplitChars
                  wrapper={<div style={{ display: "inline-block" }} />}
                >
                  {progressTeamA >= progressTeamB
                    ? quotesA[rand]
                    : quotesB[rand]}
                </SplitChars>
              </Tween>
            </span>
          </div>
          <div className="d-flex border-bottom border-5 brand-border-white py-5 position-relative ms-auto brand-progress-bar">
            <div className="position-absolute top-100 start-0 translate-middle border-start border-5 brand-border-white">
              &nbsp;
            </div>
            <div className="position-absolute bottom-0 end-0 brand-text-white fs-3">
              <FontAwesomeIcon icon="flag-checkered" />
            </div>

            <Tween
              from={{ left: "0" }}
              to={{ left: `${parseInt(progressTeamA)}%` }}
              delay={progressTeamA >= progressTeamB ? "1.6" : "1.4"}
              duration={3}
            >
              <div
                className="position-absolute bottom-0 text-center brand-progress-pin"
                style={{
                  backgroundImage: `url(${Pin})`,
                }}
              >
                <Image
                  src={imageProgressA.filename}
                  sm="50x50"
                  md="75x75"
                  lg="100x100"
                  alt=""
                  className="w-75"
                />
              </div>
            </Tween>
            <Tween
              from={{ left: "0" }}
              to={{ left: `${parseInt(progressTeamB)}%` }}
              delay={progressTeamA >= progressTeamB ? "1.4" : "1.3"}
              duration={3}
            >
              <div
                className="position-absolute bottom-0 text-center brand-progress-pin"
                style={{
                  backgroundImage: `url(${Pin})`,
                }}
              >
                <Image
                  src={imageProgressB.filename}
                  sm="50x50"
                  md="75x75"
                  lg="100x100"
                  alt=""
                  className="w-75"
                />
              </div>
            </Tween>
          </div>
        </div>
      </div>
      <div className="text-center">The date is printed here - {deadline}</div>
      <div className="position-absolute bottom-0 start-0 brand-character ms-0 ms-lg-0 ms-xxl-5 overflow-hidden d-none d-lg-block">
        <Image
          src="https://a.storyblok.com/f/132023/570x900/8b2e48a8a2/boss-tracks-and-laps.png"
          sm="100x0"
          md="200x0"
          lg="300x0"
          alt=""
        />
      </div>
    </section>
  );
};

export default Progress;

Progress.propTypes = {
  progressTeamA: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  progressTeamB: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Progress.defaultProps = {
  progressTeamA: 0,
  progressTeamB: 0,
};
