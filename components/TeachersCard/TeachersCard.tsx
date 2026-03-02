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
  onUnfavorite?: () => void;
};

export default function TeachersCard({ teacher, onUnfavorite }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, loading } = useAuth();

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setIsFavorite(false);
      return;
    }

    const loadFavorites = async () => {
      const favs = await getFavorites(user.uid);
      setIsFavorite(favs.includes(String(teacher.id)));
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
        onUnfavorite?.();
      } else {
        await addFavorite(user.uid, teacher.id);
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    }
  };
  const handleBookClick = () => {
    if (!activeLevel) {
      toast.error('Please select level first');
      return;
    }

    setIsModalOpen(true);
  };
  return (
    <div className={css.card}>
      <div className={css.avatar}>
        <img
          className={css.cardFoto}
          src={teacher?.avatar_url ?? '/placeholder.png'}
          alt="Foto teacher"
        />
        <svg className={css.iconFoto} width={24} height={24}>
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
                Lessons done:
                <span className={css.text}>{teacher.lessons_done}</span>
              </p>
            </li>
            <li className={css.cardItem}>
              <svg className={css.iconlogo} width={16} height={16}>
                <use href="/sprite.svg#icon-Star-2"></use>
              </svg>
              <p className={css.cardText}>
                Rating:<span className={css.text}>{teacher.rating}</span>
              </p>
            </li>
            <li className={css.cardItem}>
              <p className={css.cardText}>
                Price / 1 hour:
                <span className={`${css.text} ${css.cardTextGreen}`}>
                  {teacher.price_per_hour}$
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
              <span className={`${css.text} ${css.cardTextLine}`}>
                {teacher.languages.join(', ')}
              </span>
            </p>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Lesson Info:
              <span className={`${css.cardText} ${css.text}`}>
                {teacher.lesson_info}
              </span>
            </p>
            <p className={`${css.cardText} ${css.cardTextGray}`}>
              Conditions:
              <span className={`${css.cardText} ${css.text}`}>
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
                            <use href="/sprite.svg#icon-Star-2"></use>
                          </svg>
                          <span className={css.text}>
                            {Number(review.reviewer_rating).toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={css.cardText}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {!isOpen ? (
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
        ) : (
          <div className={css.extraInfo}>
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

            <Button
              variant="primary"
              text="Book trial lesson"
              onClick={handleBookClick}
            />
            {isModalOpen && (
              <Modal onClose={closeModal}>
                <Book
                  teacher={teacher}
                  selectedLevel={activeLevel}
                  onClose={closeModal}
                />
              </Modal>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
