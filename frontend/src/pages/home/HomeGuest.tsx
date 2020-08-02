import * as React from "react";
import { useEffect } from "react";
import "./HomeGuest.scss";
import { Link } from "react-router-dom";
import AOS from "aos";

export const HomeGuest = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  window.addEventListener("load", AOS.refresh);

  return (
    <main className="home-guest">
      <div className="container">
        <section>
          <img
            src={require("../../img/home/abstr1.jpg")}
            alt="A website for learning dictionary"
          />
          <div>
            This is a website for learning English dictionary. You might have
            seen dozens of card-based websites and apps for learning a language
            dictionary. This is just another one.
          </div>
        </section>

        <section data-aos="fade-up" data-aos-anchor-placement="center-bottom">
          <img
            src={require("../../img/home/abstr2.jpg")}
            alt="It's really it."
          />
          <div>
            <h3>
              This website should contain some unique features, shouldn't it?
            </h3>
            Actually no, it doesn't contain any breaking features. Everything is
            pretty standard. Moreover, there are many really cool apps.
            Personally I recommend Anki. I have been using Anki for a long time.
            It's really great.
          </div>
        </section>

        <section data-aos="fade-up" data-aos-anchor-placement="center-bottom">
          <img
            src={require("../../img/home/abstr3.jpg")}
            alt="The reason for the website to be created"
          />
          <div>
            <h3>So, why did I create this website?</h3>
            During the years with Anki I developed my own way of using it. It
            relies on:
            <ul>
              <li>
                learning sentences or, rarely, phrases, instead of just words;
              </li>
              <li>
                typing whole these sentences instead of just guessing the
                correct translation.
              </li>
            </ul>
            According to the described approach, I found out a few features Anki
            lacked:
            <ul>
              <li>
                the ability to find proper example-sentences for new words at
                creating of a new card;
              </li>
              <li>the assessment of a typed sentence.</li>
            </ul>
            I admit, I didn't research much and maybe Anki contains a great
            functionality for this, or there are other resources providing these
            features. I just decided to create my own website with a minimal but
            imported for me number of functions.
          </div>
        </section>

        <section data-aos="fade-up" data-aos-anchor-placement="center-bottom">
          <img src={require("../../img/home/abstr4.jpg")} alt="how it works" />
          <div>
            <h3>How to use it?</h3>
            <ol>
              <li>
                Find some words you want to learn. Don't know which words worth
                learning in the first place? Just read some book and create the
                list of those words, you don't know. The ones are meat in your
                list more than once should be the proper candidates for being
                learned first.
              </li>
              <li>
                Find some examples of sentences containing your word using this
                website (yes, it can do it). Pick one, you like most of all.
              </li>
              <li>Provide your translation and complete creating the card.</li>
              <li>
                When you have enough cards, you can learn them. The engine of
                this website will automatically assess your answers.
              </li>
            </ol>
          </div>
        </section>

        <section data-aos="fade-up" data-aos-anchor-placement="center-bottom">
          <img src={require("../../img/home/abstr5.jpg")} alt="sign up" />
          <div>
            <h3>Not frightened? Not bored?</h3>
            <Link to="/sign-up">Sign up!</Link>
          </div>
        </section>
      </div>
    </main>
  );
};
