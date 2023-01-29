import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import IletisimFormu from "./IletisimFormu";
import App from "../App";

test("hata olmadan render ediliyor", () => {
  render(<App />);
});

test("iletişim formu headerı render ediliyor", () => {
  render(<IletisimFormu />);
  const IletisimFormus = screen.getByText(/İletişim Formu/i);
  expect(IletisimFormus).toBeInTheDocument();
});

test("kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.", async () => {
  render(<IletisimFormu />);
  const userName = screen.getByPlaceholderText(/İlhan/i);
  userEvent.type(userName, "da");
  const err = screen.getByTestId("error");
  expect(err).toBeInTheDocument();
});

test("kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const usersName = screen.getByPlaceholderText(/İlhan/i);
  const lastName = screen.getByPlaceholderText(/Mansız/i);
  const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(usersName, "a");
  userEvent.type(lastName, "b");
  userEvent.clear(lastName);
  userEvent.type(Email, "c");
  const errList = screen.getAllByTestId("error");
  expect(errList.length).toEqual(3);
});

test("kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.", async () => {
  render(<IletisimFormu />);
  const usersName = screen.getByPlaceholderText(/İlhan/i);
  const lastName = screen.getByPlaceholderText(/Mansız/i);
  const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  const btn = screen.getByRole("button");
  userEvent.type(usersName, "furkan");
  userEvent.type(lastName, "ozturj");
  userEvent.click(btn);
  const errList = await screen.findAllByTestId("error");
  expect(errList.length).toEqual(1);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(Email, "ozturj");
  const err = screen.getByTestId("error");
  expect(err).toBeInTheDocument();
});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
  render(<IletisimFormu />);
  const usersName = screen.getByPlaceholderText(/İlhan/i);
  const lastName = screen.getByPlaceholderText(/Mansız/i);
  const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  const btn = screen.getByRole("button");
  userEvent.type(usersName, "furkan");
  userEvent.type(lastName, "");
  userEvent.type(Email, "furkabozturk1635@gmail.com");
  userEvent.click(btn);
  const errList = await screen.findAllByTestId("error");
  expect(errList.length).toEqual(1);
});

test("ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.", async () => {
  render(<IletisimFormu />);
  const usersName = screen.getByPlaceholderText(/İlhan/i);
  const lastName = screen.getByPlaceholderText(/Mansız/i);
  const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  userEvent.type(usersName, "a");
  userEvent.type(lastName, "b");
  userEvent.clear(lastName);
  userEvent.type(Email, "c");
  const errList = screen.getAllByTestId("error");
  expect(errList.length).toEqual(3);
});

test("form gönderildiğinde girilen tüm değerler render ediliyor.", async () => {
  render(<IletisimFormu />);
  const usersName = screen.getByPlaceholderText(/İlhan/i);
  const lastName = screen.getByPlaceholderText(/Mansız/i);
  const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
  const btn = screen.getByRole("button");
  userEvent.type(usersName, "furkan");
  userEvent.type(lastName, "ozturk");
  userEvent.type(Email, "furkabozturk1635@gmail.com");
  userEvent.click(btn);
});
