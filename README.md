# React Rental App

Welcome to the React Rental App – your ultimate platform for van rentals, where you can experience the world on wheels!

![React Rental App Banner](https://github.com/xMohamedAwad/rentalGifs/blob/main/full.gif)

## Table of Contents

- [Roles](#roles)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Pages](#pages)
  - [Homepage (Home)](#homepage-home)
  - [Van Listings (Vans)](#van-listings-vans)
  - [Van Detail Page (VanDetail)](#van-detail-page-vandetail)
  - [User Profile (Profile)](#user-profile-profile)
  - [Host Dashboard (Dashboard)](#host-dashboard-dashboard)
- [API Endpoint](#api-endpoint)
- [Contributing](#contributing)
- [License](#license)
- [Feedback](#feedback)
- [Credits](#credits)
- [Stay Connected](#stay-connected)

## Roles

The React Rental App serves two key roles:

- **User**: As a user, you can explore and rent vans for your adventures.
- **Host**: Hosts have the opportunity to list their vans for rent and manage their listings.
  > Due to limitations in my free Firebase account, I opted for an alternative approach to implement user roles within the app. Instead of deploying custom functions, I utilized the simplicity of `localStorage` in conjunction with a `custom hook` to manage user roles effectively.

## Technologies

This app is crafted with the following technologies:

- [React 18](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Router 6](https://reactrouter.com/)
- [Firebase (Firestore,Authentication)](https://firebase.google.com/docs/firestore)

## Getting Started

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/react-rental-app.git
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Start the development server:

   ```shell
   npm run dev
   ```

## Pages

App Structure:

```
└── Layout
   ├── Home
   ├── Vans
   │
   ├── VanDetail
   │   ├── VanInfo
   │   └── VanReviews
   │
   ├── Login
   ├── Signup
   │
   ├── AuthRequired
   │   └── Checkout
   │
   ├── Profile
   │
   └── NotFound
   │
   └── AuthRequired (for Hosts)
       └── RoleBasedComponent
           ├── Dashboard
           ├── HostReviews
           ├── HostVans
           │
           ├── HostVanDetail
               ├── HostVanInfo
               ├── HostVanPricing
               └── HostVanPhotos

```

### Homepage (Home)

![Home Page](https://github.com/xMohamedAwad/rentalGifs/blob/main/Home.gif)

Immersive landing page with GSAP-powered animations, high-quality images, and smooth scrolling for an engaging user experience.

1. GSAP Animation Magic: Elevate user engagement with seamless transitions and captivating animations throughout.
2. Visual Delight: Stunning images provide a glimpse of our rental service's essence in each section.
3. Effortless Exploration: Enjoy smooth scrolling, powered by the custom 'Lenis' library, for easy navigation.

### Van Listings (Vans)

![Van Listings Page](https://github.com/xMohamedAwad/rentalGifs/blob/main/Vanlist.gif)

Browse a comprehensive list of vans available for rent, complete with enticing images and detailed descriptions.

### Van Detail Page (VanDetail)

![Van Detail Page](https://github.com/xMohamedAwad/rentalGifs/blob/main/VanItem.gif)

Get up close and personal with a specific van. Explore high-resolution images, read user reviews, and even rent the van directly.

- **Nested Page**: [Van Info](#van-info)

### Van Info

A subpage within Van Detail, providing essential information about the van's specifications.

- **Nested Page**: [Van Reviews](#van-reviews)

### Van Reviews

Read what others have to say about their rental experiences with this van.

### User Profile (Profile)

![User Profile Page](https://github.com/xMohamedAwad/rentalGifs/blob/main/Host.gif)

View and edit your user profile, including your display name and profile picture.

### Host Dashboard (Dashboard)

Hosts can efficiently manage their van listings, reviews, and track rental income in this dedicated dashboard.

## API Endpoint

Our app communicates with Firebase Firestore to store and retrieve van listings and user data. Firestore powers the seamless interaction between users and hosts, making the experience smooth and efficient.

### API Endpoints

<details>
<summary>Click to expand</summary>

#### Home

- [Welcome](#welcome)

---

#### Vans

- [Get All Vans](#get-all-vans)
- [Get Van by ID](#get-van-by-id)
- [Get Host Vans](#get-host-vans)
- [Get Host Van by ID](#get-host-van-by-id)
- [Add Van](#add-van)
- [Add Review](#add-review)
- [Get Van Reviews](#get-van-reviews)

---

#### Host

- [Get Host Reviews](#get-host-reviews)
- [Rent Van](#rent-van)
- [Get User Profile](#get-user-profile)
- [Update User Profile](#update-user-profile)

</details>
<br/>

## Contributing

We welcome contributions from the community! If you'd like to enhance the app, fix bugs, or add exciting features.

## License

This project is licensed under the [MIT License](LICENSE).

## Feedback

We highly value your feedback! If you have any questions, suggestions, or encounter any issues, please feel free to reach out to us at [xMohamedAwad@gmail.com](mailto:xMohamedAwad@gmail.com).

## Credits

- Developed by [MohamedAwad](https://muhammad-awad-portfolio.firebaseapp.com/en)
- Special thanks to the open-source community.

## Stay Connected

Stay updated and connected with me:

- [LinkedIn](https://www.linkedin.com/in/xmohamedawad/)
- [devTo](https://dev.to/xmohamedawad)

```

```
