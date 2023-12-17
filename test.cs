
using namespace RestSharp;

public class KasirRestRepository{
    public void add(Kasir kasir){
        string base_url = "https://ip_ku/";
        string endpoint = $"api/add";

        var client = new RestClient(base_url);
        var request = new RestRequest(endpoint, Method.POST);
        request.AddJsonBody(mhs);

        var response = client.Execute(request);
    }

    public list<Kasir> getAll(){
        string base_url = "https://ip_ku/";
        string endpoint = $"api/getAll";

        var client = new RestClient(base_url);
        var request = new RestRequest(endpoint, Method.GET);

        var response = client.Execute<List<Kasir>>(request);
        return response.Data;
    }
}