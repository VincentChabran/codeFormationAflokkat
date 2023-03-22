package testio;

import java.io.*;

public class EcrireFichier {

	public static void main(String[] args) {
		try {
			FileWriter fw=new FileWriter("essai.txt");
			BufferedWriter bw= new BufferedWriter(fw);
			bw.write("Ceci est mon fichier");
			bw.newLine();
			bw.write("Il est à moi...");
			for(int i=0;i<20;i++)
     		{
     			bw.write(Integer.toString(i));
     			bw.newLine();
     			
     		}
			bw.close();
			System.out.println("Ecriture terminée");
		}
	   
		catch (Exception e) {
	    	System.out.println("Erreur " + e);
	   }	
	}
}
