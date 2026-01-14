import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './Book.module.css';

type Teacher = {
  name: string;
  avatar: string;
};

type Props = {
  teacher: Teacher;
};

type FormValues = {
  username: string;
  email: string;
  phone: string;
  reason: string;
};

export default function Book({ teacher }: Props) {
  const handleSubmit = (formData: FormData) => {
    const username = formData.get('username')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    if (!username || username.length < 2) {
      alert('Enter valid name');
      return;
    }

    if (!email || !email.includes('@')) {
      alert('Enter valid email');
      return;
    }

    if (!phone || phone.length < 10) {
      alert('Enter valid phone');
      return;
    }
    console.log(username, email, phone);
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
        <h3 className={css.subTitel}>
          What is your main reason for learning English?
        </h3>
        <ul className={css.list}>
          <li className={css.item}>
            <label>
              <input type="radio" name="reason" />
              Career and business
            </label>
          </li>

          <li className={css.item}>
            <label>
              <input type="radio" name="reason" />
              Lesson for kids
            </label>
          </li>
          <li className={css.item}>
            <label>
              <input type="radio" name="reason" />
              Living abroad
            </label>
          </li>
          <li className={css.item}>
            <label>
              <input type="radio" name="reason" />
              Exams and coursework
            </label>
          </li>
          <li className={css.item}>
            <label>
              <input type="radio" name="reason" />
              Culture, travel or hobby
            </label>
          </li>
        </ul>

        <form action={handleSubmit} className={css.form}>
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
