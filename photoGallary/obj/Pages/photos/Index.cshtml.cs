using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using photoGallery.newPhoto;

namespace photoGallary.Pages_photos
{
    public class IndexModel : PageModel
    {
        private readonly photoGallarynewPhotoContext _context;

        public IndexModel(photoGallarynewPhotoContext context)
        {
            _context = context;
        }

        public IList<newPhoto> newPhoto { get;set; }

        public async Task OnGetAsync()
        {
            newPhoto = await _context.newPhoto.ToListAsync();
        }
    }
}
