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
    public class DetailsModel : PageModel
    {
        private readonly photoGallarynewPhotoContext _context;

        public DetailsModel(photoGallarynewPhotoContext context)
        {
            _context = context;
        }

        public newPhoto newPhoto { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            newPhoto = await _context.newPhoto.FirstOrDefaultAsync(m => m.ID == id);

            if (newPhoto == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
