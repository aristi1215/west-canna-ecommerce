import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { supabase } from "../supabase/client";
  import { Session } from "@supabase/supabase-js";
  import { Redirect } from "expo-router";
  import { ActivityIndicator } from "react-native";
  
  type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: any;
    isAdmin: boolean

  };
  
  const AuthContext = createContext<AuthData>({
    session: null,
    loading: true,
    profile: null,
    isAdmin: false
  });
  
  export const useAuthContext = () => useContext(AuthContext);
  
  export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null)
  
      useEffect(() => {
        const fetchSession = async () => {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            console.error("Error fetching session:", error);
          } else {
            setSession(session);
            if (session) {
              fetchProfile(session.user.id); // Llamar a fetchProfile si existe una sesión
            }
          }
          setLoading(false);
        };
      
        const fetchProfile = async (userId:any) => {
          const { data, error } = await supabase.from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
      
          if (error) {
            console.error("Error fetching profile:", error);
          } else {
            setProfile(data);
          }
        };
      
        fetchSession();
      
        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          if (session) {
            fetchProfile(session.user.id); // Vuelve a llamar a fetchProfile en cambios de sesión
          } else {
            setProfile(null); // Restablece el perfil si no hay sesión
          }
          setLoading(false);
        });
      
      }, []);
      
  
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <AuthContext.Provider value={{ session, profile, loading, isAdmin: profile?.group === 'ADMIN' }}>
        {children}
      </AuthContext.Provider>
    );
  };
  