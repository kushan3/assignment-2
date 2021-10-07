using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using photoGallary.newPhoto;
using System;
using System.Linq;

namespace photoGallary.newPhoto
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new photoGallarynewPhotoContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<photoGallarynewPhotoContext>>()))
            {
                // Look for any movies.
                if (context.newPhoto.Any())
                {
                    return;   // DB has been seeded
                }

                context.newPhoto.AddRange(
                    new newPhoto
                    {
                        category = "Birds",
                        ReleaseDate = DateTime.Parse("2020-2-12"),
                        size = "28 Mb",
                        Resolution = 1080
                    }
                );
                context.SaveChanges();
            }
        }
    }
}