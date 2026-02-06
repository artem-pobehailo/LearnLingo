'use client';

import { useEffect, useState } from 'react';
import css from './TeachersCard.module.css';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Book from '../Book/Book';
import { Teacher } from '@/types/user';
import toast from 'react-hot-toast';
import { useAuth } from '../utils/auth';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '@/lib/Firebase/favorites';

type Props = {
  teacher: Teacher;
};

export default function TeachersCard({ teacher }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, isAuth, loading } = useAuth();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (loading || !user) return;

    const loadFavorites = async () => {
      const favs = await getFavorites(user.uid);
      setIsFavorite(favs.includes(teacher.id));
    };

    loadFavorites();
  }, [user, loading, teacher.id]);

  const handleFavoriteClick = async () => {
    if (loading) return;
    if (!user) {
      toast.error('This feature is available only for authorized users');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, teacher.id);
        setIsFavorite(false);
      } else {
        await addFavorite(user.uid, teacher.id);
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };

  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <img
          className={css.cardFoto}
          src={teacher?.avatar_url ?? '/placeholder.png'}
          alt="Foto teacher"
        />
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
                Lessons done:{' '}
                <span className={css.text}>{teacher.lessons_done}</span>
              </p>
            </li>
            <li className={css.cardItem}>
              <svg className={css.iconlogo} width={16} height={16}>
                <use href="/sprite.svg#icon-Star-2"></use>
              </svg>
              <p className={css.cardText}>
                Rating:<span className={css.cardText}>{teacher.rating}</span>
              </p>
            </li>
            <li className={css.cardItem}>
              <p className={css.cardText}>
                Price / 1 hour:
                <span className={`${css.cardText} ${css.cardTextGreen}`}>
                  {teacher.price_per_hour}
                </span>
              </p>
            </li>
          </ul>
          <button
            type="button"
            disabled={loading}
            className={`${css.favoriteBtn} ${
              isFavorite ? css.isActive : ''
            } ${loading ? css.disabled : ''}`}
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
          >
            <svg className={css.favoriteIcon} width={26} height={26}>
              <use href="/sprite.svg#icon-heart" />
            </svg>
          </button>
        </div>
        <div>
          <h2 className={css.titelName}>
            {teacher.name} {teacher.surname}
          </h2>
          <div className={css.textCard}>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Speaks:
              <span className={`${css.cardText} ${css.cardTextLine}`}>
                {teacher.languages.join(', ')}
              </span>
            </p>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Lesson Info:
              <span className={css.cardText}>{teacher.lesson_info}</span>
            </p>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Conditions:
              <span className={css.cardText}>
                {teacher.conditions.join(' ')}
              </span>
            </p>
          </div>
          {!isOpen && (
            <button
              className={css.cardButton}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? 'Hide details' : 'Read more'}
            </button>
          )}

          {isOpen && (
            <div className={css.extraInfo}>
              <p className={`${css.cardText} ${css.cardTextMore}`}>
                {teacher.experience}
              </p>

              <ul className={css.reviewsList}>
                {teacher.reviews.map((review) => (
                  <li key={review.reviewer_name} className={css.reviewItem}>
                    <div className={css.reviewItemDiv}>
                      <img
                        className={css.cardFotoReview}
                        src="/block.png"
                        alt="Foto Student"
                      />
                      <div className={css.cardFotoName}>
                        <p className={`${css.cardText} ${css.cardTextGray}`}>
                          {review.reviewer_name}
                        </p>

                        <div className={css.reviewReting}>
                          <svg className={css.iconlogo} width={16} height={16}>
                            <use href="/sprite.svg#icon-ukraine"></use>
                          </svg>
                          <span className={css.text}>
                            {' '}
                            {review.reviewer_rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={css.cardText}>{review.comment}</p>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                text="Book trial lesson"
                onClick={openModal}
              />
              {isModalOpen && (
                <Modal onClose={closeModal}>
                  <Book teacher={teacher} />
                </Modal>
              )}
            </div>
          )}
        </div>

        <ul className={css.levelList}>
          {teacher.levels.map((level) => (
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
