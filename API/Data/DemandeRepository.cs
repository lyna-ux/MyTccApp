using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DemandeRepository : IDemandeRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;


        public DemandeRepository(DataContext context, IMapper mapper,ILogger<DemandeRepository> logger )
    {
        _mapper = mapper;
        _context = context;
        _logger = logger;
    }
        public void AddDemande(Demande demande)
        {
            _context.Add(demande);
        }

        public void Delete(Demande demande)
        {
            throw new NotImplementedException();
        }

        public async Task<Demande> GetDemandeByMatricule(string matriculeDeposant)
        {
           return await _context.Demandes
                    
                        .SingleOrDefaultAsync(x => x.MatriculeDeposant == matriculeDeposant); 
        }

        public async Task<Demande> GetDemandeByRef(string refDemande)
        {
           return await _context.Demandes
                    
                        .SingleOrDefaultAsync(x => x.refDemande == refDemande); 
        }

      

        public async  Task<IEnumerable<Demande>> GetDemandesAsync()
        {
            var  demandes = await _context.Demandes.ToListAsync();
            return demandes;
        }

        public async Task<IEnumerable<Demande>> GetDemandesByMatricule(string matricule)
        {
              var demandes = await _context.Demandes
                        .Where(d => d.MatriculeDeposant == matricule)
                        .ToListAsync();

            return demandes;
        }

        public async Task<IEnumerable<Demande>> GetDemandesByService(string service)
        {
            var demandes = await _context.Demandes
                        .Where(d => d.service == service)
                        .ToListAsync();

            return demandes;
        }

       

        public async Task<bool> SaveAllAsync()
        {
             try
                {
                    // Save changes to the database asynchronously
                    int affectedRows = await _context.SaveChangesAsync();

                    // Return true if any rows were affected
                    return affectedRows > 0;
                }
                catch (Exception ex)
                {
                    // Log the error or perform any necessary error handling
                    // Example: Log the exception message and stack trace
                    _logger.LogError(ex, "An error occurred while saving changes.");

                    // Return false indicating that an error occurred during saving
                    return false;
                }
        }

        public void Update(Demande demande)
        {
            _context.Entry(demande).State = EntityState.Modified;
        }
    }
}