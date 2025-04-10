import { countUsers, getAllUsers } from './api';
import axios from 'axios';
jest.mock('axios');

const mockApiUrl = `${process.env.REACT_APP_SERVER_URL}/users`;

describe('countUsers', () => {
  it('fetches successfully data from an API', async () => {
    const mockData = {
      data: {
        utilisateurs: [
          { id: '1', nom: 'a', prenom: 'b', email: 'c@c.fr' },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    await expect(countUsers()).resolves.toEqual(1);
    expect(axios.get).toHaveBeenCalledWith(mockApiUrl);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(countUsers()).rejects.toThrow(errorMessage);
  });
});

describe('getAllUsers', () => {
  it('fetches successfully data from an API', async () => {
    const mockData = {
      data: {
        utilisateurs: [
          { id: '1', nom: 'a', prenom: 'b', email: 'c@c.fr' },
        ],
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    await expect(getAllUsers()).resolves.toEqual(mockData.data.utilisateurs);
    expect(axios.get).toHaveBeenCalledWith(mockApiUrl);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(getAllUsers()).rejects.toThrow(errorMessage);
  });
});