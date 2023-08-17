import React from 'react';
import { FormTitle, FormContact, FormButton } from './ContactForm.Styled';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getContactsItems, addContact } from 'redux/taskSlice';
import { useEffect } from 'react';
// eslint-disable-next-line
export function ContactForm() {
    // eslint-disable-next-line no-unused-vars
// eslint-disable-next-line
  const dispatch = useDispatch();
  const contactsValue = useSelector(getContactsItems);
    // eslint-disable-next-line no-unused-vars
// eslint-disable-next-line
  const {
    register,
      // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars

    handleSubmit,
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line
    formState: { errors },
      // eslint-disable-next-line no-unused-vars
// eslint-disable-next-line
    reset,
    formState,
  } = useForm({
    defaultValues: {
      name: '',
      number: '',
    },
    mode: 'onTouched',
  });
  // eslint-disable-next-line
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState.isSubmitSuccessful, reset]);
// eslint-disable-next-line
  const submitForm = data => {
    const loverName = data.name.toLowerCase();
    if (contactsValue.find(item => item.name.toLowerCase() === loverName))
      return console.log('this name already exists');
    dispatch(addContact(data));
  };

  return (
    <>
      <FormTitle>Phone Book</FormTitle>
      <FormContact onSubmit={handleSubmit(submitForm)}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            {...register('name')}
          />
        </label>
        <label>
          Tel:
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            {...register('number')}
          />
        </label>
        <FormButton type="submit">Add contact</FormButton>
      </FormContact>
    </>
  );
    // eslint-disable-next-line no-unused-vars
// eslint-disable-next-line
}
