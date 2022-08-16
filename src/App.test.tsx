import { render, screen, queryByAttribute, fireEvent, waitFor, findAllByText } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
// const getById = queryByAttribute.bind(null, 'id');

test('renders app header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Virtualized List/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Add new Button', () => {
  render(<App />);
  const AddNewBtn = screen.getByText(/Add new/i);
  expect(AddNewBtn).toBeInTheDocument();
});

test('renders Table Header', () => {
  render(<App />);
  const TableSerial = screen.getByText(/Serial/i);
  const TableWord = screen.getByText(/Word/i);
  const TableAcronym = screen.getByText(/Acronym/i);
  expect(TableSerial).toBeInTheDocument();
  expect(TableWord).toBeInTheDocument();
  expect(TableAcronym).toBeInTheDocument();
});

test('renders Initial Table Body', () => {
  render(<App />);
  for(let i = 1; i < 15; i++) {
    const TableSerial = screen.getByText(i.toString());
    expect(TableSerial).toBeInTheDocument();
  }
});

test('Add new User', async () => {
  render(<App />);
  // const AddNewBtn = screen.getByText(/Add new/i);
  // act(async () => {
  const AddNewBtn = screen.getByText(/Add new/i);
  AddNewBtn.click();
  // const InputName:HTMLInputElement = screen.getElementById('AddNew_Word')
  (await screen.findAllByText('Type your Word') as unknown as HTMLInputElement).value = 'test123';
  (await screen.findAllByText('Acronym') as unknown as HTMLInputElement).value = 'ts123';

  const SaveBtn = screen.getByText(/Save Changes/i);
  SaveBtn.click();
  // });
  expect(AddNewBtn).toBeInTheDocument();
});
