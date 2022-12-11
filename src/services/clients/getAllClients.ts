import { api } from "../api";
import { ClientDTO } from "../dtos/clientDTO";

export const getAllClients = async () => {
  const { data } = await api.get<ClientDTO[]>("/backups");

  const dateBR = data.map((item) => ({
    ...item,
    motivo: !item.motivo ? "sem motivo de falha" : item.motivo,
    dataBr: item.data.toString().split("-").reverse().join("/"),
  }));

  return dateBR;
};
