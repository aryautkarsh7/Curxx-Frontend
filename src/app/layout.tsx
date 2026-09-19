import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EmergencyProvider } from "@/components/EmergencyModal";
import MobileTabBar from "@/components/MobileTabBar";
import MotionRoot from "@/components/MotionRoot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Curxx Healthcare | Clinical Precision & Warm Trust",
  description: "Consult India's Top Doctors Online, in 60 Seconds.",
};

export default function RootLayout({
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
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=ac_unit,accessibility_new,accessible,account_balance_wallet,account_circle,acute,add,alarm,ambulance,analytics,android,apartment,arrow_back,arrow_downward,arrow_forward,arrow_upward,attach_file,auto_awesome,badge,bedtime,biotech,biotechnology,bloodtype,bolt,bone,bookmark,bookmark_border,cached,calendar_month,calendar_today,call,call_end,campaign,cancel,cardiology,chat,check,check_circle,chevron_left,chevron_right,child_care,chips,clinical_notes,close,cloud_upload,colorize,content_copy,content_cut,coronavirus,credit_card,currency_rupee,delete,dentistry,dermatology,description,directions,directions_car,domain,download,drag_indicator,e911_emergency,ecg,ecg_heart,eco,edit_note,electric_bolt,emergency,emergency_heat,encrypted,event,event_available,expand_more,face,face_retouching_natural,favorite,female,file_upload,filter_alt_off,filter_list,flare,fmd_bad,folder_open,format_h4,format_list_bulleted,forum,fullscreen,gastroenterology,group,healing,health_and_safety,health_metrics,hearing,help_outline,hematology,home,home_health,home_pin,image,info,keyboard_arrow_down,keyboard_return,keyboard_tab,labs,lightbulb,link,liquor,local_bar,local_hospital,local_offer,local_parking,local_pharmacy,local_shipping,location_on,lock,lock_reset,mail,male,medical_information,medical_services,medication,meeting_room,menu,mic,minimize,monitor_heart,monitor_weight,my_location,nephrology,network_check,neurology,nightlight,nights_stay,north_east,notifications,open_in_full,open_in_new,payments,person,personal_injury,phone_iphone,photo_camera,photo_library,picture_as_pdf,pill,pin_drop,play_circle,policy,pregnant_woman,prescriptions,present_to_all,psychiatry,psychology,pulmonology,qr_code_2,qr_code_scanner,radiology,receipt_long,refresh,remove,replay,respiratory_rate,restart_alt,sanitizer,save_as,schedule,science,search,search_off,security,send,settings,share,shield,shield_person,shopping_bag,shopping_cart,smart_toy,smartphone,soap,spa,speed,star,stethoscope,stomach,support_agent,sync,sync_saved_locally,task_alt,thermometer,thermostat,thumb_up,timelapse,timer,timer_off,tips_and_updates,transgender,trending_down,trending_up,tune,unfold_more,update,upload_file,vaccines,verified,verified_user,video_call,video_chat,videocam,visibility,vital_signs,volume_up,warning,water_drop,wb_sunny,wb_twilight,work,zoom_in&display=block" rel="stylesheet" />
      </head>
      <body className="bg-surface-container-lowest text-on-surface font-body-default text-body-default selection:bg-surface-variant selection:text-primary min-h-screen flex flex-col pb-16 lg:pb-0">
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
