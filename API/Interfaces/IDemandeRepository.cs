using API.Entities;


namespace API.Interfaces
{
    public interface IDemandeRepository
    {
   
        void Update(Demande demande);
        void Delete(Demande demande);
        Task<bool> SaveAllAsync();
        void AddDemande(Demande demande);
        Task<IEnumerable<Demande>> GetDemandesAsync();
        Task<Demande> GetDemandeByRef(string refDemande);
        Task<IEnumerable<Demande>> GetDemandesByService(string service);
        Task<IEnumerable<Demande>> GetDemandesByMatricule(string matricule);
        Task<Demande> GetDemandeByMatricule(string MatriculeDeposant);
       
    }
}