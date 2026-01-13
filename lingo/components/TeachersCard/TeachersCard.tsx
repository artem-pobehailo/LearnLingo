'use client';

import { useState } from 'react';
import css from './TeachersCard.module.css';
import Button from '../Button/Button';

const mockReviews = [
  {
    id: '1',
    userName: 'Frank',
    userAvatar: '/block.png',
    rating: 4.0,
    comment: "Jane's lessons were very helpful. I made good progress.",
  },
  {
    id: '2',
    userName: 'Anna',
    userAvatar: '/block.png',
    rating: 4.5,
    comment: 'Very clear explanations and friendly atmosphere.',
  },
];

export default function TeachersCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <img className={css.cardFoto} src="/block.png" alt="Foto Teachers" />
        <svg className={css.iconFoto} width={12} height={12}>
          <use href="/sprite.svg#icon-Group-82"></use>
        </svg>
      </div>
      <div className={css.cardR}>
        <div className={css.cardHeader}>
          <p className={`${css.cardText} ${css.cardTextGray}`}>Languages</p>

          <ul className={css.cardList}>
            <li className={css.cardItem}>
              <svg className={css.iconlogo} width={16} height={16}>
                <use href="/sprite.svg#icon-book-open-01"></use>
              </svg>
              <span className={css.cardText}>Lessons online</span>
            </li>
            <li className={css.cardItem}>
              <p className={css.cardText}>
                Lessons done: <span className={css.text}>1098</span>
              </p>
            </li>
            <li className={css.cardItem}>
              <svg className={css.iconlogo} width={16} height={16}>
                <use href="/sprite.svg#icon-Star-2"></use>
              </svg>
              <p className={css.cardText}>
                Rating:<span className={css.cardText}>4.8</span>
              </p>
            </li>
            <li className={css.cardItem}>
              <p className={css.cardText}>
                Price / 1 hour:
                <span className={`${css.cardText} ${css.cardTextGreen}`}>
                  30$
                </span>
              </p>
            </li>
          </ul>
          <button
            type="button"
            className={`${css.favoriteBtn} ${isFavorite ? css.isActive : ''}`}
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label="Add to favorites"
          >
            <svg className={css.favoriteIcon} width={26} height={26}>
              <use href="/sprite.svg#icon-heart" />
            </svg>
          </button>
        </div>
        <div>
          <h2 className={css.titelName}>Jane Smith</h2>
          <div className={css.textCard}>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Speaks:
              <span className={`${css.cardText} ${css.cardTextLine}`}>
                {' '}
                German, French
              </span>
            </p>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Lesson Info:
              <span className={css.cardText}>
                {' '}
                Lessons are structured to cover grammar, vocabulary, and
                practical usage of the language.
              </span>
            </p>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Conditions:
              <span className={css.cardText}>
                {' '}
                Welcomes both adult learners and teenagers (13 years and
                above).Provides personalized study plans
              </span>
            </p>
          </div>
          {!isOpen && (
            <button
              className={css.cardButton}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(true)}
            >
              Read more
            </button>
          )}

          {isOpen && (
            <div className={css.extraInfo}>
              <p className={`${css.cardText} ${css.cardTextMore}`}>
                Jane is an experienced and dedicated language teacher
                specializing in German and French. She holds a Bachelor's degree
                in German Studies and a Master's degree in French Literature.
                Her passion for languages and teaching has driven her to become
                a highly proficient and knowledgeable instructor. With over 10
                years of teaching experience, Jane has helped numerous students
                of various backgrounds and proficiency levels achieve their
                language learning goals. She is skilled at adapting her teaching
                methods to suit the needs and learning styles of her students,
                ensuring that they feel supported and motivated throughout their
                language journey.
              </p>

              <ul className={css.reviewsList}>
                {mockReviews.map((review) => (
                  <li key={review.id} className={css.reviewItem}>
                    <div className={css.reviewItemDiv}>
                      <img
                        className={css.cardFotoReview}
                        src="/block.png"
                        alt="Foto Student"
                      />
                      <div className={css.cardFotoName}>
                        <p className={`${css.cardText} ${css.cardTextGray}`}>
                          Frank
                        </p>

                        <div className={css.reviewReting}>
                          <svg className={css.iconlogo} width={16} height={16}>
                            <use href="/sprite.svg#icon-ukraine"></use>
                          </svg>
                          <span className={css.text}>4.0</span>
                        </div>
                      </div>
                    </div>

                    <p className={css.cardText}>
                      Jane's lessons were very helpful. I made good progress.
                    </p>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                text="Book trial lesson"
                onClick={() => {
                  console.log('Open modal for booking lesson');
                }}
              />
            </div>
          )}
        </div>

        <ul className={css.levelList}>
          {[
            'A1 Beginner',
            'A2 Elementary',
            'B1 Intermediate',
            'B2 Upper-Intermediate',
          ].map((level) => (
            <li key={level}>
              <button
                type="button"
                className={`${css.levelButton} ${
                  activeLevel === level ? css.levelButtonActive : ''
                }`}
                onClick={() => setActiveLevel(level)}
              >
                #{level}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
