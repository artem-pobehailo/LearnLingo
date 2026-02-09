import { Teacher } from '@/types/user';
import Button from '../Button/Button';

import css from './Book.module.css';
import toast from 'react-hot-toast';
import { addBooking } from '@/lib/Firebase/booking';

type Props = {
  teacher: Teacher;
  selectedLevel?: string | null;
  onClose: () => void;
};

export default function Book({ teacher, selectedLevel, onClose }: Props) {
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get('username')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const reason = formData.get('reason')?.toString();

    if (!username || username.length < 2) {
      toast.error('Enter valid name');
      return;
    }

    if (!email || !email.includes('@')) {
      toast.error('Enter valid email');
      return;
    }

    if (!phone || phone.length < 10) {
      toast.error('Enter valid phone');
      return;
    }
    if (!selectedLevel) {
      toast.error('Select level first');
      return;
    }

    if (!reason) {
      toast.error('Select reason');
      return;
    }

    try {
      await addBooking({
        teacherId: teacher.id,
        username,
        email,
        phone,
        reason,
        level: selectedLevel,
        createdAt: Date.now(),
      });

      toast.success('Trial lesson booked successfully 🎉');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to book lesson');
    }
  };

  return (
    <div className={css.bookModal}>
      <div className={css.modal}>
        <h2 className={css.titel}>Book trial lesson</h2>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.review}>
          <img className={css.cardFoto} src="/block.png" alt="Foto teacher" />
          <div className={css.cardName}>
            <p className={css.cardTextGray}>Your teacher</p>
            <p className={css.cardText}>{teacher.name}</p>
          </div>
        </div>

        {selectedLevel && (
          <p className={css.selectedLevel}>
            Selected level: <strong>{selectedLevel.toUpperCase()}</strong>
          </p>
        )}

        <form action={handleSubmit} className={css.form}>
          <h3 className={css.subTitel}>
            What is your main reason for learning English?
          </h3>
          <ul className={css.list}>
            <li className={css.item}>
              <label>
                <input type="radio" name="reason" value="career" required />
                Career and business
              </label>
            </li>

            <li className={css.item}>
              <label>
                <input type="radio" name="reason" value="kids" />
                Lesson for kids
              </label>
            </li>
            <li className={css.item}>
              <label>
                <input type="radio" name="reason" value="abroad" />
                Living abroad
              </label>
            </li>
            <li className={css.item}>
              <label>
                <input type="radio" name="reason" value="exams" />
                Exams and coursework
              </label>
            </li>
            <li className={css.item}>
              <label>
                <input type="radio" name="reason" value="travel" />
                Culture, travel or hobby
              </label>
            </li>
          </ul>

          <label className={css.label}>
            <input
              className={css.inputl}
              type="text"
              name="username"
              placeholder="Your name"
              required
            />
          </label>

          <label className={css.label}>
            <input
              className={css.inputl}
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </label>

          <label className={css.label}>
            <input
              className={css.inputl}
              type="phone"
              name="phone"
              placeholder="Phone number"
              required
            />
          </label>
          <Button type="submit" variant="primary" text="Book" />
        </form>
      </div>
    </div>
  );
}
