function createVenue(venue) {
  const mainContent = document.querySelector('.main-content');

  const venueBar = document.createElement('div');
  venueBar.classList.add('venue-bar');

  const barInformation = document.createElement('div');
  barInformation.classList.add('bar-information');

  const venueTitle = document.createElement('div');
  venueTitle.classList.add('venue-title');
  venueTitle.innerText = venue.name;

  barInformation.appendChild(venueTitle);

  if (venue.seated_capacity) {
    const seatedCapacity = document.createElement('div');
    seatedCapacity.classList.add('venue-seated-capacity');
    const seatedCapacityText = document.createElement('span');
    seatedCapacityText.classList.add('venue-bar-gray-text');
    seatedCapacityText.innerText = 'Seated';
    const seatedCapacityValue = document.createElement('span');
    seatedCapacityValue.innerText = venue.seated_capacity;

    seatedCapacity.appendChild(seatedCapacityText);
    seatedCapacity.appendChild(seatedCapacityValue);
    barInformation.appendChild(seatedCapacity);
  };

  if (venue.standing_capacity) {
    const standingCapacity = document.createElement('div');
    standingCapacity.classList.add('venue-standing-capacity');
    const standingCapacityText = document.createElement('span');
    standingCapacityText.classList.add('venue-bar-gray-text');
    standingCapacityText.innerText = 'Standing';
    const standingCapacityValue = document.createElement('span');
    standingCapacityValue.innerText = venue.standing_capacity;

    standingCapacity.appendChild(standingCapacityText);
    standingCapacity.appendChild(standingCapacityValue);
    barInformation.appendChild(standingCapacity);
  };

  venueBar.appendChild(barInformation);

  const aboutVenueMobile = document.createElement('div');
  aboutVenueMobile.classList.add('about-the-venue-mobile-version');

  const venueImageMobile = document.createElement('img');
  venueImageMobile.classList.add('about-the-venue-image');
  venueImageMobile.src = venue.image;
  venueImageMobile.alt = '';

  const venueDescriptionMobile = document.createElement('p');
  venueDescriptionMobile.innerText = venue.description;

  const linkButtonMobile = document.createElement('a');
  linkButtonMobile.classList.add('link-to-venue-button');
  linkButtonMobile.href = venue.social_media_accounts.web;
  linkButtonMobile.target = '_blank';
  linkButtonMobile.innerHTML = '<span>Website</span>';

  const venueContactInfoMobile = document.createElement('div');
  venueContactInfoMobile.classList.add('venue-contact-info');
  const venuePhoneNumberMobile = document.createElement('span');
  venuePhoneNumberMobile.classList.add('venue-phone-number');
  venuePhoneNumberMobile.innerText = venue.contact_number;
  const venueEmailAddressMobile = document.createElement('span');
  venueEmailAddressMobile.classList.add('venue-email-address');
  venueEmailAddressMobile.innerText = venue.contact_email;

  const venueLocationMobile = document.createElement('div');
  venueLocationMobile.classList.add('venue-location');
  venueLocationMobile.innerHTML = `
    <svg class="location-icon" width="9" height="24" viewBox="0 0 9 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.81322 17.6047C0.596992 12.9421 0 12.4636 0 10.75C0 8.40278 1.90278 6.5 4.25 6.5C6.59722 6.5 8.5 8.40278 8.5 10.75C8.5 12.4636 7.90301 12.9421 4.68678 17.6047C4.47571 17.9096 4.02426 17.9095 3.81322 17.6047ZM4.25 12.5208C5.22801 12.5208 6.02083 11.728 6.02083 10.75C6.02083 9.77199 5.22801 8.97917 4.25 8.97917C3.27199 8.97917 2.47917 9.77199 2.47917 10.75C2.47917 11.728 3.27199 12.5208 4.25 12.5208Z" fill="#999999"></path>
    </svg>
    <p>${venue.address}</p>
  `;

  aboutVenueMobile.append(venueImageMobile, venueDescriptionMobile, linkButtonMobile, venueContactInfoMobile, venueLocationMobile);
  venueBar.appendChild(aboutVenueMobile);

  const aboutVenue = document.createElement('div');
  aboutVenue.classList.add('about-the-venue');

  const aboutVenueSectionLeft = document.createElement('div');
  aboutVenueSectionLeft.classList.add('about-the-venue-section-left');

  const aboutTheVenue = document.createElement('h3');
  aboutTheVenue.innerText = 'About the Venue';

  const aboutVenueSectionRight = document.createElement('div');
  aboutVenueSectionRight.classList.add('about-the-venue-section-right');

  const venueImage = document.createElement('img');
  venueImage.classList.add('about-the-venue-image');
  venueImage.src = venue.image;
  venueImage.alt = '';

  const venueDescription = document.createElement('p');
  venueDescription.innerText = venue.description;

  const linkButton = document.createElement('a');
  linkButton.classList.add('link-to-venue-button');
  linkButton.href = venue.social_media_accounts.web;
  linkButton.target = '_blank';
  linkButton.innerHTML = '<span>Website</span>';

  const venueContactInfo = document.createElement('div');
  venueContactInfo.classList.add('venue-contact-info');
  const venuePhoneNumber = document.createElement('span');
  venuePhoneNumber.classList.add('venue-phone-number');
  venuePhoneNumber.innerText = venue.contact_number;
  const venueEmailAddress = document.createElement('span');
  venueEmailAddress.classList.add('venue-email-address');
  venueEmailAddress.innerText = venue.contact_email;

  const venueLocation = document.createElement('div');
  venueLocation.classList.add('venue-location');
  venueLocation.innerHTML = `
    <svg class="location-icon" width="9" height="24" viewBox="0 0 9 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.81322 17.6047C0.596992 12.9421 0 12.4636 0 10.75C0 8.40278 1.90278 6.5 4.25 6.5C6.59722 6.5 8.5 8.40278 8.5 10.75C8.5 12.4636 7.90301 12.9421 4.68678 17.6047C4.47571 17.9096 4.02426 17.9095 3.81322 17.6047ZM4.25 12.5208C5.22801 12.5208 6.02083 11.728 6.02083 10.75C6.02083 9.77199 5.22801 8.97917 4.25 8.97917C3.27199 8.97917 2.47917 9.77199 2.47917 10.75C2.47917 11.728 3.27199 12.5208 4.25 12.5208Z" fill="#999999"></path>
    </svg>
    <p>${venue.address}</p>
  `;

  aboutVenueSectionLeft.appendChild(aboutTheVenue);
  aboutVenueSectionLeft.appendChild(venueDescription);
  aboutVenueSectionLeft.appendChild(linkButton);
  aboutVenueSectionLeft.appendChild(venueContactInfo);
  aboutVenueSectionRight.appendChild(venueImage);
  aboutVenueSectionRight.appendChild(venueLocation);

  aboutVenue.appendChild(aboutVenueSectionLeft);
  aboutVenue.appendChild(aboutVenueSectionRight);

  venueBar.appendChild(aboutVenue);

  mainContent.appendChild(venueBar);
};