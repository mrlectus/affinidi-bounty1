# Bounty - Build Upon the Affinidi Capstone

Affinidi aims to change the current approach to digital identity by empowering individuals to take control of their data and privacy.

## Affinidi Vault
Affinidi Vault enables you to discover, collect, store, share, and monetise your data in a fragmented data world. By leveraging decentralised technologies, Affinidi Vault empowers greater control, adheres to privacy-by-design principles, and prioritises user-centricity at its core.

Here am going to be using Affinidi to add more features to the Project (Online shopping store)

## Stack

- Nextjs
- Tailwindcss
- ShadcnUI
- NextAuth

## Features

- Enable Profile Picture
- Product Personalization (Gender base)
- Price Localization
- Email Notification


## Profile Picture

The Ability to display the profile picture set by the user has been added into the app. This give the user a feel that they are really in
control of their data.

In other to do this we have to add some additional data to the presentation Exchange (PEX) protocol to request for the user profile picture.

The PEX looks like this:

```json
{
  "id": "picture_vc",
  "name": "Picture VC",
  "purpose": "Check if data contains necessary fields",
  "group": [
    "A"
  ],
  "constraints": {
    "fields": [
      {
        "path": [
          "$.type"
        ],
        "purpose": "Check if VC type is correct",
        "filter": {
          "type": "array",
          "contains": {
            "type": "string",
            "pattern": "HITPicture"
          }
        }
      },
      {
        "path": [
          "$.credentialSubject.picture"
        ]
      }
    ]
  }
}
```

With this, we could quickly obtain the user's profile image data, after obtaining permission.

Profile information is gotten from the user by writing a simple function that you can find in `service/api.ts` line no 8, and a hook in
`hooks/hook.ts` on line number 22 to enable us get the user info and link to profile image.
The url can now easily be called in the header to display the image.

## Product Personalization (Gender base)
Using the information gotten from the PEX we could easily get the user gender and display them products in the store based on their gender!.

The PEX looks something like this:

```json
{
  "id": "gender_vc",
  "name": "Gender VC",
  "purpose": "Check if data contains necessary fields",
  "group": [
    "A"
  ],
  "constraints": {
    "fields": [
      {
        "path": [
          "$.type"
        ],
        "purpose": "Check if VC type is correct",
        "filter": {
          "type": "array",
          "contains": {
            "type": "string",
            "pattern": "HITGender"
          }
        }
      },
      {
        "path": [
          "$.credentialSubject.gender"
        ]
      }
    ]
  }
},

```

Witch this we have access to the gender and can display gender based product to the user, if they are male, male products is being displayed
as a suggestion and female otherwise. The component for displaying this can be found in the file `app/components/suggested-product.ts` we
also get the gender info by using the hook we wrote earlier `hooks/hook.ts`  on line number 22.

## Price Localization
By using the Country the user is from we could easily convert the base currency to that of the user, this way they know exactly how much
each product cost in the store in their own local currency.

PEX for the Country looks like this:

```json
{
  "id": "country_vc",
  "name": "Country VC",
  "purpose": "Check if data contains necessary fields",
  "group": [
    "A"
  ],
  "constraints": {
    "fields": [
      {
        "path": [
          "$.type"
        ],
        "purpose": "Check if VC type is correct",
        "filter": {
          "type": "array",
          "contains": {
            "type": "string",
            "pattern": "HITCountry"
          }
        }
      },
      {
        "path": [
          "$.credentialSubject.country"
        ]
      }
    ]
  }
},
```

By using an external API we could easily call it to do the conversion for us. Code for this can be found in the file `app/service/api.ts` on
line number 153, a hook is also written for it in `app/hooks/hooks.ts` on line number 86. Putting everything together user can now get the
benefit of knowing how much each product cost in their local currency.


## Email Notification
After a user has checkout we need a way to notify them of their purchases. The verified email provided by the user is used to achieve this,
we could easily send an email to that email address informing the user that their purchases was successful!

The PEX for getting the user email looks like this:

```json
{
  "id": "email_vc",
  "name": "Email VC",
  "purpose": "Check if data contains necessary fields",
  "group": [
    "A"
  ],
  "constraints": {
    "fields": [
      {
        "path": [
          "$.type"
        ],
        "purpose": "Check if VC type is correct",
        "filter": {
          "type": "array",
          "contains": {
            "type": "string",
            "pattern": "Email"
          }
        }
      },
      {
        "path": [
          "$.credentialSubject.email"
        ],
        "purpose": "Check if VC contains email field",
        "filter": {
          "type": "string"
        }
      }
    ]
  }
},
```

With this we could call an external API to help us with sending the emails with personalized messages. Code for this can be found also in
`app/service/api.ts` on line number 112 and a hook to easily get the data in `app/hooks/hook.ts` on line number 156.
