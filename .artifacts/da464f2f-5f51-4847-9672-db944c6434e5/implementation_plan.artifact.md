# Portfolio Final Deployment & Polish Plan

This plan finalizes the interactive elements, ensures correct folder naming, and pushes the project to your dedicated GitHub repository.

## User Review Required

> [!IMPORTANT]
> - **Folder Renamed**: I have renamed the folder to `portfolio_project` on your Desktop.
> - **GitHub Target**: Pushing to `https://github.com/MindBreakOps/Asim_Aljmaan`.
> - **Photo Required**: Please ensure your profile photo is saved as `public/profile.jpg` in the project folder.

## Proposed Changes

### 1. Functional State Management
- **Lifting State**: Move `activeScene` from `SignatureScene.tsx` to `app/page.tsx`.
- **Shared Props**: Pass the state and setter to both `Nav.tsx` and `SignatureScene.tsx`.
- **Navigation Menu**: clicking "Work", "About", etc. in the "three dots" menu will now correctly trigger the overlays.

### 2. Interactive CV Book Refinement
#### [MODIFY] [AboutOverlay.tsx](file:///Users/asim/Desktop/portfolio_project/components/overlays/AboutOverlay.tsx)
- **Visuals**: Add side tabs on the right of the book for quick navigation between pages.
- **Photo**: Add the profile photo to Page 1 with a "pinned/taped" aesthetic.
- **Texture**: Add a subtle paper grain texture.

### 3. Git & GitHub Deployment
- **Git Init**: Initialize the repository.
- **Ignore**: Ensure `node_modules` and `.next` are ignored.
- **Push**: `git remote add origin https://github.com/MindBreakOps/Asim_Aljmaan.git` and push the `main` branch.

## Verification Plan

### Manual Verification
- Verify the "three dots" menu triggers the correct overlays.
- Check the book's physical tabs and the photo on Page 1.
- Confirm the project is live on GitHub at the specified URL.
