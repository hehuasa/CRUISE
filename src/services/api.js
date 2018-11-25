import request from '../utils/request';

const path = 'http://127.0.0.1:3001';
export const getAgentList = async () => {
  return request(`${path}/agents`);
};
export const editAgent = async ({ id, params }) => {
  return request(`${path}/agents/${id}`, {
    method: 'PUT',
    body: params,
  });
};
