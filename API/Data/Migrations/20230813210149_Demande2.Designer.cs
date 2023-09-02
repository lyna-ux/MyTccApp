﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230813210149_Demande2")]
    partial class Demande2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.16");

            modelBuilder.Entity("API.Entities.AppRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Adresse")
                        .HasColumnType("TEXT");

                    b.Property<string>("AdresseEmail")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Badge")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CIN")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateEntree")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateNaissance")
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateSortie")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Genre")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("IdSage")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("Nom")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("Opération")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Poste")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prenom")
                        .HasColumnType("TEXT");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<string>("SituationFamiliale")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<float>("SoldeConge")
                        .HasColumnType("REAL");

                    b.Property<string>("Statut")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Tel")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("logRef")
                        .HasColumnType("TEXT");

                    b.Property<string>("refPlanningWeek")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("API.Entities.AppUserRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Id")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("API.Entities.Demande", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("MatriculeDeposant")
                        .HasColumnType("TEXT");

                    b.Property<string>("NomDeposant")
                        .HasColumnType("TEXT");

                    b.Property<string>("NomTraitant")
                        .HasColumnType("TEXT");

                    b.Property<string>("PrenomDeposant")
                        .HasColumnType("TEXT");

                    b.Property<string>("PrenomTraitant")
                        .HasColumnType("TEXT");

                    b.Property<int>("Statut")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Type")
                        .HasColumnType("TEXT");

                    b.Property<string>("commentaireTraitement")
                        .HasColumnType("TEXT");

                    b.Property<string>("details")
                        .HasColumnType("TEXT");

                    b.Property<string>("refDemande")
                        .HasColumnType("TEXT");

                    b.Property<string>("service")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Demandes");
                });

            modelBuilder.Entity("API.Entities.log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CIN")
                        .HasColumnType("TEXT");

                    b.Property<string>("Date")
                        .HasColumnType("TEXT");

                    b.Property<int>("IdSage")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Nom")
                        .HasColumnType("TEXT");

                    b.Property<string>("Opération")
                        .HasColumnType("TEXT");

                    b.Property<string>("Prenom")
                        .HasColumnType("TEXT");

                    b.Property<int>("Ticket")
                        .HasColumnType("INTEGER");

                    b.Property<float>("breakDurationNbr")
                        .HasColumnType("REAL");

                    b.Property<string>("breakDurationStr")
                        .HasColumnType("TEXT");

                    b.Property<float>("formationDurationNbr")
                        .HasColumnType("REAL");

                    b.Property<string>("formationDurationStr")
                        .HasColumnType("TEXT");

                    b.Property<int>("hybride")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("logDate")
                        .HasColumnType("TEXT");

                    b.Property<float>("logDurationNbr")
                        .HasColumnType("REAL");

                    b.Property<string>("logDurationStr")
                        .HasColumnType("TEXT");

                    b.Property<string>("logOffTimeS1")
                        .HasColumnType("TEXT");

                    b.Property<string>("logOffTimeS2")
                        .HasColumnType("TEXT");

                    b.Property<string>("logOnTimeS1")
                        .HasColumnType("TEXT");

                    b.Property<string>("logOnTimeS2")
                        .HasColumnType("TEXT");

                    b.Property<string>("logRef")
                        .HasColumnType("TEXT");

                    b.Property<int>("logStatus")
                        .HasColumnType("INTEGER");

                    b.Property<int>("logType")
                        .HasColumnType("INTEGER");

                    b.Property<float>("lunchBreakDurationNbr")
                        .HasColumnType("REAL");

                    b.Property<string>("lunchBreakDurationStr")
                        .HasColumnType("TEXT");

                    b.Property<string>("refPlanningWeek")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("logs");
                });

            modelBuilder.Entity("API.Entities.Planning", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("HeureDebut_S1")
                        .HasColumnType("TEXT");

                    b.Property<string>("HeureDebut_S2")
                        .HasColumnType("TEXT");

                    b.Property<string>("HeureFin_S1")
                        .HasColumnType("TEXT");

                    b.Property<string>("HeureFin_S2")
                        .HasColumnType("TEXT");

                    b.Property<float>("HeuresPlanifie")
                        .HasColumnType("REAL");

                    b.Property<string>("refPlanning")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Planning");
                });

            modelBuilder.Entity("API.Entities.PlanningWeek", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("DimancheId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("JeudiId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("LundiId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("MardiId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("MercrediId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Opération")
                        .HasColumnType("TEXT");

                    b.Property<int?>("SamediId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("User")
                        .HasColumnType("TEXT");

                    b.Property<int?>("VendrediId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("refPlanningWeek")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("DimancheId");

                    b.HasIndex("JeudiId");

                    b.HasIndex("LundiId");

                    b.HasIndex("MardiId");

                    b.HasIndex("MercrediId");

                    b.HasIndex("SamediId");

                    b.HasIndex("VendrediId");

                    b.ToTable("PlanningWeeks");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("API.Entities.AppUserRole", b =>
                {
                    b.HasOne("API.Entities.AppRole", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Entities.PlanningWeek", b =>
                {
                    b.HasOne("API.Entities.Planning", "Dimanche")
                        .WithMany()
                        .HasForeignKey("DimancheId");

                    b.HasOne("API.Entities.Planning", "Jeudi")
                        .WithMany()
                        .HasForeignKey("JeudiId");

                    b.HasOne("API.Entities.Planning", "Lundi")
                        .WithMany()
                        .HasForeignKey("LundiId");

                    b.HasOne("API.Entities.Planning", "Mardi")
                        .WithMany()
                        .HasForeignKey("MardiId");

                    b.HasOne("API.Entities.Planning", "Mercredi")
                        .WithMany()
                        .HasForeignKey("MercrediId");

                    b.HasOne("API.Entities.Planning", "Samedi")
                        .WithMany()
                        .HasForeignKey("SamediId");

                    b.HasOne("API.Entities.Planning", "Vendredi")
                        .WithMany()
                        .HasForeignKey("VendrediId");

                    b.Navigation("Dimanche");

                    b.Navigation("Jeudi");

                    b.Navigation("Lundi");

                    b.Navigation("Mardi");

                    b.Navigation("Mercredi");

                    b.Navigation("Samedi");

                    b.Navigation("Vendredi");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("API.Entities.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Entities.AppRole", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
