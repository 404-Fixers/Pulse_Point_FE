import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import bloodFlower from "../../assets/blood-flower.png";
import bloodHands from "../../assets/blood-hands.png";
import "./LandingPage.css";
function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero" id="home">
          <div className="hero__content">
            <p className="hero__eyebrow">PULSEPOINT</p>

            <h1>Find blood donors when every second matters.</h1>

            <p className="hero__text">
              PulsePoint helps hospitals connect with available blood donors
              quickly, while making it easier for people to give blood and save
              lives.
            </p>

            <div className="hero__actions">
              <Button href="/register">Become a Donor</Button>

              <Button href="/register" variant="secondary">
                Register Your Hospital
              </Button>
            </div>
          </div>
          <div className="hero__image">
            <img src={bloodFlower} alt="Donate blood" />
          </div>
        </section>
        <section className="about" id="about">
          <img
            src={bloodHands}
            alt="Hands reaching toward each other inside a blood drop"
            className="about__bg-logo"
            aria-hidden="true"
          />

          <div className="about__content">
            <p className="section-eyebrow">ABOUT PULSEPOINT</p>

            <h2>Making blood donation easier, faster, and more connected.</h2>

            <p>
              PulsePoint connects hospitals with available blood donors, helping
              people find the blood they need while making it easier for donors
              to step forward when it matters most.
            </p>

            <div className="about__points">
              <div>
                <strong>Connect</strong>
                <span>Bring hospitals and eligible donors together.</span>
              </div>

              <div>
                <strong>Respond</strong>
                <span>Help people find blood when they need it most.</span>
              </div>

              <div>
                <strong>Save Lives</strong>
                <span>Make every donation count.</span>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works">
          <SectionTitle
            title="How It Works"
            text="Three simple steps to help connect blood donors with hospitals."
          />
          <div>
            <article>
              <span>01</span>
              <h3>Register</h3>
              <p>Create your donor or hospital account in minutes.</p>
            </article>

            <article>
              <span>02</span>
              <h3>Get Matched</h3>
              <p>
                Hospitals create blood requests and eligible donors nearby are
                notified.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Respond & Help</h3>
              <p>
                Accept a request and connect with the hospital to complete the
                donation.
              </p>
            </article>
          </div>
        </section>

        <section>
          <SectionTitle
            title="Why PulsePoint?"
            text="Faster connections. More lives reached."
          />
          <ul>
            <li>Find eligible donors faster</li>
            <li>Prioritize available donors nearby</li>
            <li>Help hospitals respond to urgent blood needs</li>
            <li>Make blood donation easier to access</li>
          </ul>
        </section>

        <section>
          <h2>Impact</h2>

          <div>
            <div>
              <strong>1,250+</strong>
              <span>Registered Donors</span>
            </div>

            <div>
              <strong>84</strong>
              <span>Hospitals</span>
            </div>

            <div>
              <strong>320+</strong>
              <span>Requests Fulfilled</span>
            </div>
          </div>
        </section>

        <section id="blood-drives">
          <SectionTitle
            title="Give blood. Give hope."
            text="Upcoming blood donation drives near you."
          />

          <div className="blood-drives__grid">
            <article className="blood-drive-card">
              <div className="blood-drive-card__date">
                <strong>15</strong>
                <span>AUG</span>
              </div>

              <div className="blood-drive-card__content">
                <h3>Lagos Community Blood Drive</h3>
                <p>Lagos State University Teaching Hospital</p>
                <span>9:00 AM – 3:00 PM</span>
              </div>
            </article>

            <article className="blood-drive-card">
              <div className="blood-drive-card__date">
                <strong>22</strong>
                <span>AUG</span>
              </div>

              <div className="blood-drive-card__content">
                <h3>Give Blood, Save Lives</h3>
                <p>National Blood Service Centre, Lagos</p>
                <span>10:00 AM – 4:00 PM</span>
              </div>
            </article>

            <article className="blood-drive-card">
              <div className="blood-drive-card__date">
                <strong>29</strong>
                <span>AUG</span>
              </div>

              <div className="blood-drive-card__content">
                <h3>Community Donor Day</h3>
                <p>Yaba Medical Centre</p>
                <span>9:00 AM – 2:00 PM</span>
              </div>
            </article>
          </div>

          <a className="blood-drives__link" href="/blood-drives">
            View All Blood Drives
          </a>
        </section>
        <section>
          <h2>Someone may need your blood today.</h2>

          <a href="/register">Become a Donor</a>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default LandingPage;
