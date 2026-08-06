/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./*.html",
    "./*.md",
    "./_layouts/**/*.html",
    "./_includes/**/*.html",
    "./_services/**/*.md",
    "./_guides/**/*.md",
    "./_districts/**/*.md",
    "./content/**/*.md",
    "./assets/js/**/*.js",
    "./_posts/**/*.md"
  ],

  darkMode: "class",

  theme: {

    extend: {


      /* =====================================================
         COLORS
      ====================================================== */

      colors: {

        background: {
          DEFAULT:"#0b1220",
          soft:"#111827",
        },


        surface: {

          DEFAULT:"#111827",

          elevated:"#182234",

          card:"#1e293b",

        },


        border: {

          DEFAULT:"#334155",

          light:"#475569",

        },


        text: {

          DEFAULT:"#f8fafc",

          soft:"#cbd5e1",

          muted:"#94a3b8",

        },


        primary: {

          DEFAULT:"#fbbf24",

          hover:"#f59e0b",

          soft:"#fde68a",

        },


        success:"#22c55e",

        danger:"#ef4444",

        warning:"#f59e0b",

        info:"#38bdf8",


      },


      /* =====================================================
         TYPOGRAPHY
      ====================================================== */

      fontFamily: {

        sans:[

          "Inter",

          "Segoe UI",

          "system-ui",

          "-apple-system",

          "BlinkMacSystemFont",

          "Roboto",

          "sans-serif"

        ],

        display:[

          "Inter",

          "system-ui",

          "sans-serif"

        ]

      },


      /* =====================================================
         RADIUS
      ====================================================== */

      borderRadius: {

        xs:"6px",

        sm:"10px",

        DEFAULT:"14px",

        lg:"18px",

        xl:"24px",

        "2xl":"32px",

        full:"999px",

      },


      /* =====================================================
         SHADOW
      ====================================================== */

      boxShadow:{


        soft:

        "0 4px 10px rgba(0,0,0,.15)",


        card:

        "0 10px 30px rgba(0,0,0,.25)",


        large:

        "0 20px 50px rgba(0,0,0,.32)",


        glow:

        "0 0 40px rgba(251,191,36,.18)"

      },


      /* =====================================================
         CONTAINER
      ====================================================== */

      container:{

        center:true,

        padding:{

          DEFAULT:"1.5rem",

          lg:"2rem"

        }

      },


      /* =====================================================
         ANIMATION
      ====================================================== */

      keyframes:{


        marquee:{

          "0%":{

            transform:"translateX(0%)"

          },


          "100%":{

            transform:"translateX(-50%)"

          },


        },


        fadeUp:{


          "0%":{

            opacity:"0",

            transform:"translateY(20px)"

          },


          "100%":{

            opacity:"1",

            transform:"translateY(0)"

          }


        },


        float:{


          "0%,100%":{

            transform:"translateY(0)"

          },


          "50%":{

            transform:"translateY(-8px)"

          }


        }


      },


      animation:{


        marquee:

        "marquee 25s linear infinite",


        fadeUp:

        "fadeUp .5s ease-out",


        float:

        "float 6s ease-in-out infinite"


      }

    }

  },


  plugins:[

    require("@tailwindcss/forms"),

    require("@tailwindcss/container-queries")

  ]

};
