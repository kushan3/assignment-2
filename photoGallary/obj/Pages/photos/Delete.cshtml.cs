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
    public class DeleteModel : PageModel
    {
        private readonly photoGallarynewPhotoContext _context;

        public DeleteModel(photoGallarynewPhotoContext context)
        {
            _context = context;
        }

        [BindProperty]
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

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            newPhoto = await _context.newPhoto.FindAsync(id);

            if (newPhoto != null)
            {
                _context.newPhoto.Remove(newPhoto);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
