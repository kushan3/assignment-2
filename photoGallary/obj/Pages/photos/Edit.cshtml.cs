using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using photoGallery.newPhoto;

namespace photoGallary.Pages_photos
{
    public class EditModel : PageModel
    {
        private readonly photoGallarynewPhotoContext _context;

        public EditModel(photoGallarynewPhotoContext context)
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

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(newPhoto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!newPhotoExists(newPhoto.ID))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool newPhotoExists(int id)
        {
            return _context.newPhoto.Any(e => e.ID == id);
        }
    }
}
