import React, { useState, useRef } from "react";
import { graphql } from "gatsby";
import Layout from "../components/Templates/Layout";
import SEO from "../utils/SEO";
import { Reveal, Tween } from "react-gsap";
import Image from "../components/Global/Image";
import Background from "../components/Global/Background";
import SmartText from "../utils/TextHandler";
import Link from "../components/Global/Link";
import Progress from "../components/Templates/Progress";
import Modal, { ModalBody, ModalFooter } from "../components/Templates/Modal";
import ShareLinks from "../components/Global/ShareLinks";

function oddOrEven(x) {
  return x & 1 ? "odd" : "even";
}

// Markup
const IndexPage = (props) => {
  const { data } = props;

  const [modalNav, setModalNav] = useState(false);

  let doc;
  if (data) {
    doc = JSON.parse(data.index.content);
  }
  const openGraph = {
    type: "website",
    title: doc.title,
    description: doc.headline,
  };

  // Handles the Join team form to open success modal
  const formSuccessCallback = () => {
    navigateModalScreens(modelRefFormSuccess);
  };
  const joinTeamA = () => {
    navigateModalScreens(modalRefTeamA);
  };
  const joinTeamB = () => {
    navigateModalScreens(modalRefTeamB);
  };

  const modalRefTeamA = useRef();
  const modalRefTeamB = useRef();
  const modalRefRewards = useRef();
  const modelRefFormSuccess = useRef();

  function navigateModalScreens(to) {
    modalRefTeamA.current.closeModal();
    modalRefTeamB.current.closeModal();
    modalRefRewards.current.closeModal();
    modelRefFormSuccess.current.closeModal();
    setModalNav(false);
    to.current.openModal();
    return;
  }
  function navigateModalScreensFromIndex(to) {
    modalRefTeamA.current.closeModal();
    modalRefTeamB.current.closeModal();
    modalRefRewards.current.closeModal();
    modelRefFormSuccess.current.closeModal();
    setModalNav(true);
    to.current.openModal();
    return;
  }

  const handleSubmitTeamA = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("joinTeamA");
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(
        () => console.log("Form successfully submitted - display thanks"),
        navigateModalScreens(modelRefFormSuccess)
      )
      .catch((error) => console.log(error));
  };

  const handleSubmitTeamB = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("joinTeamB");
    let formData = new FormData(myForm);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(
        () => console.log("Form successfully submitted - display thanks"),
        navigateModalScreens(modelRefFormSuccess)
      )
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
      <SEO openGraph={openGraph} meta={doc.meta} />

      <section>
        <div className="container-fluid position-relative">
          <div className="row">
            <Background
              element="div"
              src={doc.image_hero_background_a?.filename}
              sm="960x540"
              md="1920x1080"
              lg="1920x1080"
              className="col-6 text-center brand-background-blue-light"
            >
              <div className="py-5 d-flex flex-column justify-content-center align-items-center">
                <Tween
                  from={{
                    opacity: 0,
                    transform: "scale(0)",
                  }}
                  ease="back.out(2)"
                  duration={1}
                  delay={0.5}
                >
                  <div>
                    <Image
                      src={doc.image_logo_a?.filename}
                      sm="320x320"
                      md="720x720"
                      lg="1080x1080"
                      alt="Team A"
                      className="brand-hero-image mb-3"
                    />
                  </div>
                </Tween>
                <Image
                  src={doc.image_hero_a?.filename}
                  sm="480x270"
                  md="960x540"
                  lg="1280x720"
                  alt="Team A prize"
                  className="d-none position-absolute"
                />
                <Link
                  button
                  className="brand-btn-hex"
                  onClick={() => navigateModalScreens(modalRefTeamA)}
                >
                  Join team
                </Link>
              </div>
            </Background>
            <Background
              element="div"
              src={doc.image_hero_background_b?.filename}
              sm="960x540"
              md="1920x1080"
              lg="1920x1080"
              className="col-6 text-center brand-background-blue"
            >
              <div className="py-5 d-flex flex-column justify-content-center align-items-center">
                <Tween
                  from={{
                    opacity: 0,
                    transform: "scale(0)",
                  }}
                  ease="back.out(2)"
                  duration={1}
                  delay={0.6}
                >
                  <div>
                    <Image
                      src={doc.image_logo_b?.filename}
                      sm="320x320"
                      md="720x720"
                      lg="1080x1080"
                      alt="Team A"
                      className="brand-hero-image mb-3"
                    />
                  </div>
                </Tween>
                <Image
                  src={doc.image_hero_b?.filename}
                  sm="480x270"
                  md="960x540"
                  lg="1280x720"
                  alt="Team A prize"
                  className="d-none position-absolute"
                />
                <Link
                  button
                  className="brand-btn-hex"
                  onClick={() => navigateModalScreens(modalRefTeamB)}
                >
                  Join team
                </Link>
              </div>
            </Background>
          </div>
          <div className="position-absolute top-0 start-50 bottom-0 brand-background-blue h-100 p-1"></div>
          <div className="position-absolute top-50 start-50 translate-middle">
            <span className="brand-font brand-text-white brand-font-shadow fs-1">
              VS
            </span>
          </div>
        </div>
      </section>

      <Progress
        teamA={doc.title_team_a}
        teamB={doc.title_team_b}
        progressTeamA={doc.progress_team_a}
        progressTeamB={doc.progress_team_b}
        imageProgressA={doc.image_progress_a}
        imageProgressB={doc.image_progress_b}
        deadline={doc.deadline}
      />

      <Background
        element="section"
        src={doc.background_sections?.filename}
        sm="960x540"
        md="1920x1080"
        lg="1920x1080"
        colour={doc.background_colour && doc.background_colour}
        className="brand-background-static"
      >
        <div className="container py-5">
          {doc.headline && (
            <div className="row mb-5">
              <h2 className="text-center brand-font brand-text-white brand-font-shadow">
                {doc.headline}
              </h2>
            </div>
          )}

          {doc.sections.map((item, idx) => {
            const oddEven = oddOrEven(idx);
            return (
              <Reveal>
                <div
                  className={`row brand-background-white brand-radius shadow justify-content-center align-items-center mx-2 mx-md-0 ${
                    idx !== doc.sections.length - 1 && "mb-5"
                  } ${oddEven === "odd" ? "flex-row flex-md-row-reverse" : ""}`}
                >
                  <div className="col-12 col-md-6 text-center py-3">
                    <Image
                      src={item.image?.filename}
                      sm="480x270"
                      md="960x540"
                      lg="1280x720"
                      className="w-100"
                    />
                  </div>
                  <div className="col-12 col-md-6 p-3 pt-0 p-md-5">
                    {item.title && (
                      <Tween
                        from={{
                          opacity: 0,
                          transform: "translate3d(50px, 0, 0)",
                        }}
                        ease="back.out(1)"
                        duration={1}
                        delay={0.5}
                      >
                        <h3 className="brand-font brand-text-blue-dark">
                          {item.title}
                        </h3>
                      </Tween>
                    )}
                    {item.body && (
                      <Tween
                        from={{
                          opacity: 0,
                          transform: "translate3d(50px, 0, 0)",
                        }}
                        ease="back.out(1)"
                        duration={1}
                        delay={0.7}
                      >
                        <div>
                          <SmartText>{item.body}</SmartText>
                        </div>
                      </Tween>
                    )}
                    {item.button && (
                      <Tween
                        from={{
                          opacity: 0,
                          transform: "translate3d(50px, 0, 0)",
                        }}
                        ease="back.out(1)"
                        duration={1}
                        delay={0.9}
                      >
                        <div>
                          <Link
                            button
                            onClick={() =>
                              navigateModalScreens(modalRefRewards)
                            }
                          >
                            {item.button}
                          </Link>
                        </div>
                      </Tween>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Background>

      <Modal ref={modalRefTeamA} title={`Join ${doc.title_team_a}`}>
        <form
          name="team"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmitTeamA}
          id="joinTeamA"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="team" />
          <ModalBody>
            <Background
              src={doc.image_modal_team_a?.filename}
              sm="320x0"
              md="480x0"
              lg="720x0"
              alt={doc.image_modal_team_a.alt}
              className="w-100 brand-radius mb-3 ratio ratio-16x9"
            >
              <div className="d-flex justify-content-end align-items-end">
                <Link
                  onClick={() => navigateModalScreens(modalRefRewards)}
                  icon
                  className="brand-font brand-text-white text-decoration-none p-2"
                >
                  Check out the rewards
                </Link>
              </div>
            </Background>
            {doc.signup_team_a && <SmartText>{doc.signup_team_a}</SmartText>}
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="user"
                aria-describedby="userHelp"
                required
                placeholder="xxx-xxx-xxx-xxx"
              />
              <label for="user">User ID</label>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="terms"
                name="terms"
                required
              />
              <label
                class="form-check-label small brand-font-smaller"
                for="terms"
              >
                This is a legal T&amp;C notice
              </label>
            </div>
            <input
              name="team"
              placeholder="team"
              value="A"
              type="text"
              required
              hidden
            />
          </ModalBody>
          <ModalFooter>
            {modalNav === true && (
              <Link
                button
                onClick={() => navigateModalScreens(modalRefRewards)}
              >
                Back
              </Link>
            )}
            <Link button="real" type="submit">
              Join Team
            </Link>
          </ModalFooter>
        </form>
      </Modal>

      <Modal ref={modalRefTeamB} title={`Join ${doc.title_team_b}`}>
        <form
          name="team"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmitTeamB}
          id="joinTeamB"
        >
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="form-name" value="team" />
          <ModalBody>
            <Background
              src={doc.image_modal_team_b?.filename}
              sm="320x0"
              md="480x0"
              lg="720x0"
              alt={doc.image_modal_team_b.alt}
              className="w-100 brand-radius mb-3 ratio ratio-16x9"
            >
              <div className="d-flex justify-content-end align-items-end">
                <Link
                  onClick={() => navigateModalScreens(modalRefRewards)}
                  icon
                  className="brand-font brand-text-white text-decoration-none p-2"
                >
                  Check out the rewards
                </Link>
              </div>
            </Background>
            {doc.signup_team_b && <SmartText>{doc.signup_team_b}</SmartText>}
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="user"
                aria-describedby="userHelp"
                required
                placeholder="xxx-xxx-xxx-xxx"
              />
              <label for="user">User ID</label>
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="terms"
                name="terms"
                required
              />
              <label
                class="form-check-label small brand-font-smaller"
                for="terms"
              >
                This is a legal T&amp;C notice
              </label>
            </div>
            <input
              name="team"
              placeholder="team"
              value="B"
              type="text"
              required
              hidden
            />
          </ModalBody>
          <ModalFooter>
            {modalNav === true && (
              <Link
                button
                onClick={() => navigateModalScreens(modalRefRewards)}
              >
                Back
              </Link>
            )}
            <Link button="real" type="submit">
              Join Team
            </Link>
          </ModalFooter>
        </form>
      </Modal>

      <Modal ref={modalRefRewards} title="Rewards">
        <ModalBody>
          <div className="row align-items-center justify-content-between mb-3">
            {doc.title_team_a && (
              <div className="col">
                <h4 className="brand-font brand-text-team-a mb-0">
                  {doc.title_team_a}
                </h4>
              </div>
            )}
            <div className="col-auto">
              <Link
                onClick={() => navigateModalScreensFromIndex(modalRefTeamA)}
                button
              >
                Select team
              </Link>
            </div>
          </div>
          {doc.description_team_a && (
            <div className="row">
              <SmartText>{doc.description_team_a}</SmartText>
            </div>
          )}
          {doc.prizes_team_a && (
            <div className="row gy-4">
              {doc.prizes_team_a.map((item, idx) => {
                return (
                  <div className="col-6 small align-items-center d-flex">
                    <div
                      className="ratio ratio-1x1 me-2 d-inline-block"
                      style={{ width: "40px" }}
                    >
                      <div className="brand-background-grey rounded-circle">
                        <Image
                          src={item.image?.filename}
                          sm="40x40"
                          md="40x40"
                          lg="40x40"
                          alt={item.label}
                        />
                      </div>
                    </div>
                    <span className="d-inline-block">{item.label}</span>
                  </div>
                );
              })}
            </div>
          )}
          <hr />
          <div className="row align-items-center justify-content-between mb-3">
            {doc.title_team_b && (
              <div className="col">
                <h4 className="brand-font brand-text-team-b mb-0">
                  {doc.title_team_b}
                </h4>
              </div>
            )}
            <div className="col-auto">
              <Link
                onClick={() => navigateModalScreensFromIndex(modalRefTeamB)}
                button
              >
                Select team
              </Link>
            </div>
          </div>
          {doc.description_team_b && (
            <div className="row">
              <SmartText>{doc.description_team_b}</SmartText>
            </div>
          )}
          {doc.prizes_team_b && (
            <div className="row gy-4">
              {doc.prizes_team_b.map((item, idx) => {
                return (
                  <div className="col-6 small align-items-center d-flex">
                    <div
                      className="ratio ratio-1x1 me-2 d-inline-block"
                      style={{ width: "40px" }}
                    >
                      <div className="brand-background-grey rounded-circle">
                        <Image
                          src={item.image?.filename}
                          sm="40x40"
                          md="40x40"
                          lg="40x40"
                          alt={item.label}
                        />
                      </div>
                    </div>
                    <span className="d-inline-block">{item.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </ModalBody>
      </Modal>

      <Modal ref={modelRefFormSuccess} title="You're in!">
        <ModalBody>
          <p>Thanks lorem ipsum</p>
        </ModalBody>
        <ModalFooter>
          <ShareLinks
            meta={doc.meta}
            openGraph={doc.openGraph}
            facebook
            twitter
            email
          />
        </ModalFooter>
      </Modal>
    </Layout>
  );
};

export default IndexPage;

export const QUERY = graphql`
  query IndexPageQuery {
    index: storyblokEntry(slug: { eq: "home" }) {
      content
    }
  }
`;
