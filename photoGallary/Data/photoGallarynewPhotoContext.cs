using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using photoGallery.newPhoto;

    public class photoGallarynewPhotoContext : DbContext
    {
        public photoGallarynewPhotoContext (DbContextOptions<photoGallarynewPhotoContext> options)
            : base(options)
        {
        }

        public DbSet<photoGallery.newPhoto.newPhoto> newPhoto { get; set; }
    }
