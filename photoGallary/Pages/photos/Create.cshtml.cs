using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using photoGallery.newPhoto;

namespace photoGallary.Pages_photos
{
    public class CreateModel : PageModel
    {
        private readonly photoGallarynewPhotoContext _context;

        public CreateModel(photoGallarynewPhotoContext context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public newPhoto newPhoto { get; set; }

        // To protect from overposting attacks, see https://aka.ms/RazorPagesCRUD
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.newPhoto.Add(newPhoto);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
