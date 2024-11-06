using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

public class VideoChatHub : Hub
{
    private readonly ILogger<VideoChatHub> _logger;

    public VideoChatHub(ILogger<VideoChatHub> logger)
    {
        _logger = logger;
    }

    private static string _callerConnectionId;

    public async Task StartCall()
    {
        _callerConnectionId = Context.ConnectionId;
        _logger.LogInformation($"Call started by: {_callerConnectionId}");
        await Clients.Others.SendAsync("CallStartedBy", _callerConnectionId);
    }

    public async Task SendOffer(string offer, string targetConnectionId)
    {
        _logger.LogInformation("Sending offer to a specific client.");
        var ConnectionId = Context.ConnectionId;
        await Clients.AllExcept(ConnectionId).SendAsync("ReceiveOffer", offer, ConnectionId);
    }

    public async Task SendAnswer(string answer, string targetConnectionId)
    {
        var ConnectionId = Context.ConnectionId;
        _logger.LogInformation("Sending answer to a specific client.");
        await Clients.AllExcept(ConnectionId).SendAsync("ReceiveAnswer", answer,ConnectionId);
    }

    public async Task SendIceCandidate(string candidate, string targetConnectionId)
    {
        _logger.LogInformation("Sending ICE candidate to a specific client.");
        await Clients.Others.SendAsync("ReceiveIceCandidate", candidate);
    }
}
