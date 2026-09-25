import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EmergencyProvider } from "@/components/EmergencyModal";
import LiveCities from "@/components/LiveCities";
import MobileTabBar from "@/components/MobileTabBar";
import MotionRoot from "@/components/MotionRoot";
import { CITY_LIST } from "@/lib/catalogue-data";
import { liveCatalogue } from "@/lib/catalogue-live";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://curxx-frontend.vercel.app'),
  title: {
    default: 'Doctor Appointments Online & At Clinics Near You – Curxx',
    template: '%s',
  },
  description:
    'Book verified doctors online or at a clinic near you. Order medicines, home lab tests, and manage digital health records — all on one trusted website.',
};

/** Cities added or edited in the admin panel since the snapshot was generated (usually none). */
async function changedCities() {
  const snapshot = new Map(CITY_LIST.map((c) => [c.slug, JSON.stringify(c)]));
  const { cities } = await liveCatalogue();
  return cities.filter((c) => snapshot.get(c.slug) !== JSON.stringify(c));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=ac_unit,accessibility,accessibility_new,accessible,account_balance,account_balance_wallet,account_circle,acute,add,airline_seat_recline_normal,alarm,allergy,ambulance,analytics,android,apartment,arrow_back,arrow_downward,arrow_forward,arrow_upward,article,attach_file,auto_awesome,badge,battery_low,bed,bedtime,biotech,bloodtype,blur_circular,bolt,book,bookmark,bookmark_border,cached,calendar_month,calendar_today,call,call_end,campaign,cancel,card,cardiology,category,chat,check,check_box,check_box_outline_blank,check_circle,chevron_left,chevron_right,child_care,chips,clean_hands,clinical_notes,close,cloud_upload,colorize,computer,content_copy,content_cut,coronavirus,credit_card,crib,currency_rupee,delete,dentistry,dermatology,description,directions,directions_car,directions_walk,discount,distance,domain,download,drag_indicator,e911_emergency,ecg,ecg_heart,eco,edit_note,elderly,electric_bolt,elevator,emergency,emergency_heat,encrypted,endocrinology,error,event,event_available,expand_more,eyeglasses,face,face_retouching_natural,family_restroom,favorite,female,file_upload,files,filter_alt_off,filter_list,fitness_center,flag,flare,fmd_bad,folder_open,folder_shared,format_h4,format_list_bulleted,forum,fullscreen,gastroenterology,genetics,glucose,graphic_eq,grass,grid,group,groups,gynecology,healing,health_and_safety,health_metrics,hearing,hearing_aid,heart_check,help,help_outline,hematology,history,home,home_health,home_pin,hospital,image,immunology,info,inventory_2,keyboard_arrow_down,keyboard_return,keyboard_tab,lab_profile,labs,language,light_mode,lightbulb,linear_scale,link,liquor,local_bar,local_fire_department,local_florist,local_hospital,local_offer,local_parking,local_pharmacy,local_shipping,location_on,lock,lock_reset,login,mail,male,map,masks,medical_information,medical_services,medication,meeting_room,menu,mic,mic_off,microbiology,minimize,mode,monitor_heart,monitor_weight,monitoring,my_location,nephrology,network_check,neurology,nightlight,nights_stay,no_drinks,no_food,north_east,notifications,nutrition,oncology,open_in_full,open_in_new,ophthalmology,orders,orthopedics,overview,package,page,paid,palette,patient,payments,pediatrics,person,person_add,personal_injury,pets,phone,phone_in_talk,phone_iphone,photo_camera,photo_library,physical_therapy,picture_as_pdf,pill,pin_drop,play_arrow,play_circle,policy,precision_manufacturing,pregnant_woman,prescriptions,present_to_all,priority_high,psychiatry,psychology,psychology_alt,pulmonology,qr_code_2,qr_code_scanner,radiology,receipt_long,recent,record,record_voice_over,redeem,refresh,remove,replay,report,respiratory_rate,restart_alt,restaurant,reviews,rheumatology,rotate_right,route,sanitizer,save_as,scan,schedule,school,science,search,search_off,security,self_improvement,send,sentiment_dissatisfied,sentiment_neutral,settings,share,shield,shield_person,shopping_bag,shopping_cart,smart_toy,smartphone,smoke_free,soap,sort,source,spa,speed,sports_martial_arts,sprint,star,start,step,stethoscope,storage,straighten,subway,support_agent,surgical,symptoms,sync,sync_saved_locally,tab,target,task,task_alt,thermometer,thermostat,thumb_up,timelapse,timer,timer_off,tips_and_updates,title,today,transgender,translate,trending_down,trending_up,tune,unfold_more,update,upload,upload_file,urology,vaccines,verified,verified_user,video,video_call,video_chat,videocam,videocam_off,visibility,vital_signs,volume_up,warning,water_drop,wb_sunny,wb_twilight,woman,work,workspace_premium,zoom_in&display=block" rel="stylesheet" />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-body-default text-body-default selection:bg-surface-variant selection:text-primary min-h-screen flex flex-col pb-16 lg:pb-0">
        <LiveCities cities={await changedCities()} />
        <MotionRoot>
          <EmergencyProvider>
            {children}
            <MobileTabBar />
          </EmergencyProvider>
        </MotionRoot>
      </body>
    </html>
  );
}
